import React,{Component,useState} from "react";
import{StyleSheet}from 'react-native';
import { View,Text,TextInput,Button,SafeAreaView,Box,FormControl,Stack,Input,Pressable } from "native-base";






class AlugarImovel extends Component{
   

    constructor(props){
        super(props);
        this.state={ 

            idLocatario:0
            
        }
       
        }

        setIDImovelDisponivel = (novoImovel) => {
            idImovelDisponivel = novoImovel;
            return idImovelDisponivel;
          }


          
      // metodo que fara o registro dos pedidos

  registrarImoveis = () =>{  
    let parametros = {
        method:'PUT',
        headers: { Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        
            IDlocatario:this.state.idLocatario
          
                  
        })
   }
  // abaixo temo o caminho do local do servidor para que o dispositivo movel possa chegar a té ele para fazer a requisição
    fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/imoveis", parametros) // o endereço de  ip, é oendereço da maquina local, que estou usando, é onde esta instalado o servidor kestrel, 
    .then(response => response.json())
    .then((Json) => {
      console.log("dados enviados: "+parametros.ImagemImovel);
        ToastAndroid.show("Imvovel cadastrado", ToastAndroid.SHORT);
        //this.props.navigation.navigate('listarImovelApi');

        console.log('dados recuperados');
        console.log(Json);
       
       
    })
    .catch(error => console.log("Falha ao gravar dados: " + error));
  }
                    

          
        render(){
           
            return(
                <Box alignItems="center">

                    <Text>ID: </Text>
                <Box w="100%" maxWidth="300px">
                  <FormControl isRequired>
                    <Stack mx="4">
                      <FormControl.Label>Digite aqui o ID do locatario</FormControl.Label>
                      <Input type="text"  placeholder="Id do locatario, para cadastro de aluguél" 
                      onChangeText={(text) => this.setState({ idLocatario:text  })}/>
                     
                      
                    </Stack>
                  </FormControl>
                </Box>


                <Pressable onPress={this.registrarImoveis} >
                        {({ isPressed }) => {
                            return <Box bg={isPressed ? "blue" : "#2f4f4f"}
                                style={{ transform: [{ scale: isPressed ? 0.9 : 0.7 }] }}
                                rounded="10" overflow="hidden" borderWidth="2" borderColor="coolGray.300" width={200} maxW="96" shadow="5" p="3" >
                                <Text color="white" fontSize="25" fontWeight="900" textAlign={"center"}>Cadastrar </Text>
                            </Box>;
                        }}
                    </Pressable>
              </Box>
            );
        }


    }

export const idImovel = new AlugarImovel();
export default AlugarImovel;










/**

const SecondPage = ({route}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>
          Passar Valor com React Navigation
          </Text>
          <Text style={styles.textStyle}>
            Valor passado da Primeira Tela: {route.params.paramKey}
          </Text>
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    heading: {
      fontSize: 25,
      textAlign: 'center',
      marginVertical: 10,
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 18,
      marginVertical: 10,
    },
  });

  */