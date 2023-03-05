import React, { Component} from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, Alert,TextInput,ToastAndroid } from "react-native";


// estilos
import { telaDeCadastrostilo, containerTelaCadastro, imagensCasas, textTelaDeCadastro, botao, camera } from '../estilos/estilosImoveis';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// imports para uso de camera e acessar imagens no armazenamento
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';






class CadastrarImoveis extends Component {


  constructor(props) {
    super(props)
      

    this.state = {
      
      tipoImovel:'',
      enderecoImovel:'',
      finalidadeImovel:'',
      descricaoImovel:'',
      precoImovel:0.00,
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
              Tipoimovel:this.state.tipoImovel,
              Enderecoimovel:this.state.enderecoImovel,
              Finalidadeimovel:this.state.finalidadeImovel,
              Descricaoimovel:this.state.descricaoImovel,
              Precoimovel:parseFloat(this.state.precoImovel),    
              ImagemLocatario:this.state.imagemImovel                                         
                      
            })
       }
      // abaixo temo o caminho do local do servidor para que o dispositivo movel possa chegar a té ele para fazer a requisição
        fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/imoveis", parametros) // o endereço de  ip, é oendereço da maquina local, que estou usando, é onde esta instalado o servidor kestrel, 
        .then(response => response.json())
        .then((Json) => {
          
            ToastAndroid.show("imoveis  cadastrado", ToastAndroid.SHORT);
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
        <TextInput placeholder="tipo" placeholderTextColor="#ff7f50" style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}}  onChangeText={(text) => this.setState({tipoImovel: text})}></TextInput>
        <TextInput placeholder="endereco"  placeholderTextColor="#ff7f50" style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}}  onChangeText={(text) => this.setState({enderecoImovel: text})}></TextInput>
        <TextInput  placeholder="finalidade" placeholderTextColor="#ff7f50" style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}}  onChangeText={(text) => this.setState({finalidadeImovel: text})}></TextInput>
        <TextInput  placeholder="descrição" placeholderTextColor="#ff7f50" style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}} onChangeText={(text) => this.setState({descricaoImovel: text})}></TextInput>
        <TextInput  placeholder="valor"   placeholderTextColor="#ff7f50" style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}}   onChangeText={(text) => this.setState({precoImovel: text})}></TextInput>
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
           
          
           <Stack.Screen name= "cadastrarImoveis" component={CadastrarImoveis}/>
            


        </Stack.Navigator>

    );
}

export default CadastroImoveisApi;



