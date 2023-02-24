import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "ReactNativeSQLite.db"; //Nome do banco de dados
const database_version = "1.0"; //Versão do banco de dados
const database_displayname = "SQLite React Offline Database"; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho máximo do banco de dados

/****   ATENÇÃO   *****

comando para instalar o SQLite: npm install --save react-native-sqlite-storage

*/

export default class ItemDatabase {

    Conectar() {   //**** CRUD => CREATE - aqui o BD é aberto e a tabela é criada se não existir *****/
        let db;
        return new Promise((resolve) => { //Uma Promise é um objeto que representa a eventual conclusão ou falha de uma operação assíncrona, uma promise é um objeto retornado para o qual você adiciona callbacks, em vez de passar callbacks para uma função.
            console.log("Checando a integridade do plugin ...");
            SQLite.echoTest().then(() => {
                console.log("Integridade Ok ...");
                console.log("Abrindo Banco de Dados ...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {db = DB;
                    console.log("Banco de dados Aberto");
                    // verifica se existe alguma tabela
                    db.executeSql('SELECT 1 FROM ClienteLocatario LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");}).catch((error) => {
                        console.log("Erro Recebido: ", error);
                        console.log("O Banco de dados não está pronto... Criando tabela");
                        db.transaction((tx) => {
                            // aqui a tabela é criada, se ainda não existir
                            tx.executeSql('CREATE TABLE IF NOT EXISTS ClienteLocatario (id INTEGER PRIMARY KEY AUTOINCREMENT, imgDoAnuncio varchar(250), nome varchar(30),cpf varchar(11), dataNascimento varchar(30), dataAssiContrato varchar(30), dataPagaLuguel varchar(30))');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    };

    Desconectar(db) { // desconecta o DB, desconecta quando finaliza a aplicação
        if (db) {
            console.log("Fechando Banco de Dados");
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!");
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    };

    Listar() {   //**** CRUD => READ - aqui a tabela é lida *****/      
        return new Promise((resolve) => {  
            const lista = []; // cria um vetor
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM ClienteLocatario', []).then(([tx, results]) => {
                        console.log("Consulta completa");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, imgDoAnuncio,nome, cpf, dataNascimento,dataAssiContrato,dataPagaLuguel } = row;
                            lista.push({ id,imgDoAnuncio, nome, cpf, dataNascimento,dataAssiContrato,dataPagaLuguel });
                        }
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


   

    


    Inserir(item) {  //**** CRUD => UPDATE - aqui um registro da tabela é inserido *****/
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para inserir um novo registro 
                    tx.executeSql('INSERT INTO ClienteLocatario (imgDoAnuncio,nome, cpf, dataNascimento,dataAssiContrato,dataPagaLuguel) VALUES (?, ?, ?, ?, ?,?)', [item.imgDoAnuncio,item.nome, item.cpf, item.dataNascimento, item.dataAssiContrato,item.dataPagaLuguel]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    Atualizar(item) {   //**** CRUD => UPDATE - aqui a tabela é atualizada *****/
        return new Promise((resolve) => {
           
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                   
                    //Query SQL para atualizar um registro no banco        
                    tx.executeSql('UPDATE ClienteLocatario SET dataPagaLuguel = ?  WHERE id = ?', [item.dataPagaLuguel, item.id]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


     //Listar Por ID

     ListarPorID(id) {   //**** CRUD => READ - aqui a tabela é lida *****/      
        return new Promise((resolve) => {  
            const lista = []; // cria um vetor
           

            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM ClienteLocatario WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log("Consulta completa");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id,imgDoAnuncio, nome, cpf, dataNascimento,dataAssiContrato,dataPagaLuguel } = row;
                            lista.push({ id,imgDoAnuncio, nome, cpf, dataNascimento,dataAssiContrato,dataPagaLuguel });
                        }
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    //atualizar 2

    Remover(id) {   //**** CRUD => DELETE - aqui um registro da tabela é removido *****/
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM ClienteLocatario WHERE Id = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

}