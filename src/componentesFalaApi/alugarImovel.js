import React, { Component } from 'react';
import { View, Text, TextInput, Button,ToastAndroid  } from 'react-native';
import { StylePedido } from '../estilos/StyleLista';

class AlugarImovel extends Component {

   
    constructor(props) {
        super(props);
        this.state = {
           

            
           
        }
    }

    registrarPedido = () =>{
        let parametros = {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              
            })

      }
      // abaixo temo o caminho do local do servidor para que o dispositivo movel possa chegar a té ele para fazer a requisição
        fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/Imoveis", parametros) // o endereço de  ip, é oendereço da maquina local, que estou usando, é onde esta instalado o servidor kestrel, 
        .then(response => response.json())
        .then((dadosJson) => {
            ToastAndroid.show("Pedido #" + dadosJson.id + " cadastrado", ToastAndroid.SHORT);
            this.props.navigation.navigate('listar Imovél por ID'); // apos concluir o pedido, volta pra pela de  visualização de pratos
        })
        .catch(error => console.log("Falha ao gravar dados: " + error));
      }
                        

    render() {
        return (
            <View>
                <Text style={StylePedido.price}>ID:  </Text>
                <Text style={StylePedido.price}>Tipo:  </Text>
                <Text style={StylePedido.price}>Endereço:   </Text>
                <Text style={StylePedido.price}>Finalidade:   </Text>
                <Text style={StylePedido.price}>Descrição:  </Text>
                <Text style={StylePedido.price}>Preco: R$ </Text>
                <Text style={StylePedido.price}>ID locatario:  </Text>
               
                <TextInput  style={StylePedido.inputText}  placeholder="IDlocatario" returnKeyType="go" autoCorrect={false} onChangeText={text => this.setState({ locatarioID: text })}></TextInput>
                <Text style={StylePedido.price}>Total: R$ {this.state.total} </Text>
                <Button title="Realizar Pedido" color="#1abc9c" onPress={this.registrarPedido}/>
            </View>
        );
    }
}

export default AlugarImovel;
export const Alugarimovel = new AlugarImovel();