import React, { Component} from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, Alert,TextInput,ToastAndroid } from "react-native";


// estilos
import { telaDeCadastrostilo, containerTelaCadastro, imagensCasas, textTelaDeCadastro, botao, camera } from '../estilos/estilosImoveis';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// imports para uso de camera e acessar imagens no armazenamento
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';







class CadastrarLocatarioApi extends Component {


  constructor(props) {
    super(props)
      
  // states
    this.state = {
      nomeLocatario:'',
      cpfLocatario:'',
      dataNascLocatario:'',
      dataLocLocatario:'',
      dataVencimentoAlugLocatario:'',    
      imagemLocatario:'',
      
     }
     
  }

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

        this.setState({ imagemLocatario:img})
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
          NomeLocatario:this.state.nomeLocatario,
          CpfLocatario:this.state.cpfLocatario,
          DataNascLocatario:this.state.dataNascLocatario,
          DataLocLocatario:this.state.dataLocLocatario,
          DataVencimentoAlugLocatario:this.state.dataVencimentoAlugLocatario,    
          ImagemLocatario:this.state.imagemLocatario
                                     
                  
        })
   }
  // abaixo temo o caminho do local do servidor para que o dispositivo movel possa chegar a té ele para fazer a requisição
    fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/locatarios", parametros) // o endereço de  ip, é oendereço da maquina local, que estou usando, é onde esta instalado o servidor kestrel, 
    .then(response => response.json())
    .then((Json) => {
      
        ToastAndroid.show("lacatario cadastrado", ToastAndroid.SHORT);
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
          {this.state.imagemLocatario ? //  se imagem da camera foi capturada é verdadeiro, as caracteristicas de estilo em Image sera aplicada na imgem capturada para que ela seja exibida em uma previsualização na propria tela de cadastro e a mesma sera exibida antes de  salvar os dados
            <View style={{ borderWidth: 2, borderColor: 'white' }}>
              <Image style={{ marginVertical: 10, alignSelf: 'center', width:'90%', height: 250 }} source={{ uri: this.state.imagemLocatario }} />

            </View>
            : // se não se a condição this.state.anuncio_image for falso, não havera alteração e continuara aparecendo o texto abaixo
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', margin: '2%', marginBottom: 50 }} >nenhuma imagem selecionada</Text>
          }
        <View>
        <TextInput placeholder="Nome do locatario" placeholderTextColor="#ff7f50" style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}} onChangeText={(text) => this.setState({ nomeLocatario: text })}></TextInput>
        <TextInput placeholder="Cpf do locatario" placeholderTextColor="#ff7f50"  style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}}  onChangeText={(text) => this.setState({ cpfLocatario: text })}></TextInput>
        <TextInput placeholder="Data de nascimento do locatario" placeholderTextColor="#ff7f50" style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}} onChangeText={(text) => this.setState({ dataNascLocatario: text })}></TextInput>
        <TextInput placeholder="Data de locação do imovél" placeholderTextColor="#ff7f50"       style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}} onChangeText={(text) => this.setState({ dataLocLocatario: text })}></TextInput>
        <TextInput placeholder="Data de pagamento do aluguel"  placeholderTextColor="#ff7f50"   style={{borderWidth:2,borderColor:'gray',borderRadius:20,color:"white",fontSize:18, textAlign:'center',margin:3}} onChangeText={(text) => this.setState({ dataVencimentoAlugLocatario: text })}></TextInput>
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





export default CadastrarLocatarioApi;



