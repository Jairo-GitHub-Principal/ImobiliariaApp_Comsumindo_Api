import React, { Component, PureComponent, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, AppRegistry, StyleSheet, Alert,TextInput,ToastAndroid } from "react-native";


// estilos
import { telaDeCadastrostilo, containerTelaCadastro, imagensCasas, textTelaDeCadastro, botao, camera } from '../estilos/estilosImoveis';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// imports para uso de camera e acessar imagens no armazenamento
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



// importar a classe de seletor (Picker)
import SimplePicker from '../componentes/seletor'
// model
import imovel from '../model/imoveis';

// database
import ItemDatabaseImovel from "../databases/ItemDatabaseImovel";
import { Button } from "@rneui/base";












class Cadastro extends Component {


  constructor(props) {
    super(props)
      
  // states
    this.state = {
      
      tipoImovel:'',
      enderecoImovel:'',
      finalidadeImovel:'',
      descricaoImovel:'',
      precoImovel:0,
      imagemImovel:'',
     }
     
  }
   
// functio adicionada em uma const, que abre uma tela para que o usuario possa escolher de onde ele quer trazer a imgem, direto da camera, ou da galeria de imagens
selectImage = () => { // cria um tipo de modal alert pra mim escolher dentro dele entre uma das opções
  Alert.alert(
    "selecione","Escolha de onde selecionar a imagem",
    [
      {
        text: "Galeria",
        onPress:this.pickImageFromGalery, // chama função que chama a galeria
        style: "default"
      },

      {

        text: "Camera",
        onPress:this.pickImageFromCamera, // chama a função que chama a camera
        style: "default"
      },

      {
        text: "Cancelar",
        onPress: () => Alert.alert("Cancelado pelo usuario"),
        style: "default",
      },

    ],
    {
      cancelable: true,
      onDismiss: () => console.log("ação cancelada")

    }
  )
}

 
    // functions adicionada em uma const para  chamar a camera
    pickImageFromCamera = async () => {
      const options = {
        midiaType: 'photo',
        quality: 0.5,
        saveToPhotos: true, // ativa o salvamento na galeria de imagems, se colocar false o salvamento das fotos passa a ser no cache
        uri: '',
        type: '',
      }
      const result = await launchCamera(options);

      if (result.assets) {
        const img = result.assets[0].uri // pra pegar somente a uri
        console.log(JSON.stringify(img))
        this.setState({ imagemImovel: img })
      }
    }

    // function adicionada em uma const para abrir a galeria de imagem
     pickImageFromGalery = async () => {

      const options = { midiaType: 'photo' };
      const result = await launchImageLibrary(options);

      if (result.assets) {

        const img = result.assets[0].uri // pra pegar somente a uri

        console.log(JSON.stringify(img))

        this.setState({ imagemImovel:img})
      }
    }




      // metodo que fara o registro dos pedidos

  registrarImoveis = () =>{  
    let parametros = {
        method:'POST',
        headers: { Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        
          TipoImovel:this.state.tipoImovel,
          EnderecoImovel:this.state.enderecoImovel,
          FinalidadeImovel:this.state.finalidadeImovel,
          DescricaoImovel:this.state.descricaoImovel,
          PrecoImovel:this.state.precoImovel,
          ImagemImovel:this.state.imagemImovel
                  
        })
   }
  // abaixo temo o caminho do local do servidor para que o dispositivo movel possa chegar a té ele para fazer a requisição
    fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/imoveis", parametros) // o endereço de  ip, é oendereço da maquina local, que estou usando, é onde esta instalado o servidor kestrel, 
    .then(response => response.json())
    .then((Json) => {
        ToastAndroid.show("Imvovel cadastrado", ToastAndroid.SHORT);
        //this.props.navigation.navigate('listarImovelApi');
  
        console.log('dados recuperados');
        console.log(Json);
       
       
    })
    .catch(error => console.log("Falha ao gravar dados: " + error));
  }
                    
  
  
  



 




  render() { 
    
  return (

      <ScrollView style={containerTelaCadastro.preenchimentoFundoScrollView}>
        <View>
          <TouchableOpacity onPress={this.selectImage}   style={camera.capture}>
              <Text style={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold', color: '#4b0082' }}> Click aqui e adicione uma Imagem ao anuncio </Text>
            </TouchableOpacity>
          </View>
          {this.state.imagemImovel ? //  se imagem da camera foi capturada é verdadeiro, as caracteristicas de estilo em Image sera aplicada na imgem capturada para que ela seja exibida em uma previsualização na propria tela de cadastro e a mesma sera exibida antes de  salvar os dados
            <View style={{ borderWidth: 2, borderColor: 'white' }}>
              <Image style={{ marginVertical: 10, alignSelf: 'center', width:'90%', height: 250 }} source={{ uri: this.state.imagemImovel }} />

            </View>
            : // se não se a condição this.state.anuncio_image for falso, não havera alteração e continuara aparecendo o texto abaixo
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', margin: '2%', marginBottom: 50 }} >nenhuma imagem selecionada</Text>
          }
        <View>
        <TextInput placeholder="tipo"  onChangeText={(text) => this.setState({ tipoImovel: text })}></TextInput>
        <TextInput placeholder="endereco"  onChangeText={(text) => this.setState({ enderecoImovel: text })}></TextInput>
        <TextInput  placeholder="finalidade"  onChangeText={(text) => this.setState({ finalidadeImovel: text })}></TextInput>
        <TextInput  placeholder="descrição" onChangeText={(text) => this.setState({ descricaoImovel: text })}></TextInput>
        <TextInput  placeholder="valor"  onChangeText={(text) => this.setState({ precoImovel:text  })}></TextInput>
        </View>
      
       

          <View style={botao.viewBotao}>
            <TouchableOpacity
              onPress={this.registrarImoveis}
              style={botao.botaoCadastrar}>
              <Text style={botao.textBotao}>Cadastrar</Text>
            </TouchableOpacity>

          </View>



         


      </ScrollView>
    );
  }



}




const Stack = createNativeStackNavigator();

function CadastroImoveisApi() {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false } } >
           
          
           <Stack.Screen name= "cadastrarImoveis" component={Cadastro}/>
            


        </Stack.Navigator>

    );
}

export default CadastroImoveisApi;



