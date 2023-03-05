
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList,Pressable } from 'react-native';
import { StyleLista } from '../estilos/StyleLista';

class ListaPratos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: []
        }
    }

    

    recuperaDados = () => {
        this.setState({ loading: true });

        fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/Imoveis")
            .then(response => response.json()) // recuperação e conversão dos dados para json
            .then((dadosJson) => {
                this.setState({
                    loading: false,
                    dataSource: dadosJson // recupera os dados e os add ao state do componente
                });

                console.log('Dados recuperados');
                for (let i in dadosJson) {
                    console.log(dadosJson[i].id);
                }
            })
            // fallback "retorno" informando uma falha caso aja
            .catch(error => console.log("Falha ao recuperar dados: " + error));
    }

    componentDidMount(){ // faz a montagem  da lista de itens
        this.recuperaDados(); 
    }

    // montar os itens da lista nos componentes para exibição
    montaItemLista = (data) => { // cada item listado, sera um touchable, e o parametro que chega pela arrow function, traz tambem o navigation
        return (
          <TouchableOpacity  onPress={ () => { this.props.navigation.navigate('AlugarImovel',
           ); }}
                 
          style={StyleLista.line}>

            <View style={StyleLista.info}>
            
            <Text style={StyleLista.name}>{data.item.id}</Text>
              <Text style={StyleLista.name}>Tipo :{data.item.tipoImovel}</Text>
              <Text style={StyleLista.desc}>Endereço :{data.item.enderecoImovel}</Text>
              <Text style={StyleLista.desc}>Finalidade :{data.item.finalidadeImovel}</Text>
              <Text style={StyleLista.desc}>Descrição :{data.item.descricaoImovel}</Text>
              <Text style={StyleLista.desc}>Preço R$ :{data.item.precoImovel}</Text>
              <Text style={StyleLista.desc}>ID locatario :{data.item.IDlocatario}</Text>
            </View>
          </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                 <FlatList 
                 data={this.state.dataSource}
                renderItem={item => this.montaItemLista(item)}
                keyExtractor={item => item.id.toString()} />
            </View>
        );
    }
}

export default ListaPratos;