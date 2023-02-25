import React, { Component } from "react";
import { TouchableOpacity, ScrollView, StyleSheet,Image, _Text,SafeAreaView,FlatList } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LogBox } from "react-native/Libraries/LogBox/LogBox";
import { Box,Text,Pressable,AspectRatio,Center,Stack,Heading,HStack,VStack } from "native-base";


import { homeStyle } from "../estilos/estilos";










export default class ListagemLocatario extends Component {
    

    constructor(props) {

        super(props)
        this.state = {
            listaDecliente: [],
            
        }   
           
    }

    listarLocatario = () => {
        this.setState({ loading: true });
        fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/locatarios") // acesso para que o mobile possa acessar o servidor kestrel, que esta no computador local, por mais que estamos execultando um emulador onde rodamos um dispositivo mobile, no sistema do conputador local, o acesso do dispositivo mobile, ao servidor kestrel, é feito de forma que simula, um dispositivo real, de fora do computador onde roda o emulador

            .then(response => response.json())  // recuperação e conversão dos dados retornados
            .then((dadosJson) => {
                this.setState({ loading: false, dataSource: dadosJson });

                // teste para ver se a requisição esta funcionando como deveria

                console.log('dados recuperados');
                for (let i in dadosJson) {
                    console.log(dadosJson[i].nomeLocatario);
                }

            }) // recupera dados e os transmite ao state do componente, permitindo que os dados sejam atualizados em tela

            .catch(error => console.log("falha ao recuperar dados: " + error)); // fallback para caso de erro, retorna uma msg de erro, caso aja falha no acesso ao DB
    }


    componentDidMount() {
        this.listarLocatario();
    }

    montarItemLista = (data) => {
        return (
                                
<Box m={3} >  
        
        <Box alignItems="center" w={"100%"} >
            
              <Box maxW="100%" rounded="lg" overflow="hidden" borderColor="black.200" borderWidth="2" 
                    _light={{ borderColor: "green.500",backgroundColor: "green.200"}} 
                        _web={{shadow: 2,borderWidth: 0 }} 
                           _dark={{ backgroundColor: "gray.50" }}>
                             
                             <Box>
                                <AspectRatio w="100%" ratio={13 / 9}>
                                <Image source={{uri:data.item.imagemLocatario}} alt="image" />
                                </AspectRatio>
                            </Box>
    
                            <Stack p="1" space={3}> 
                                 <VStack  space={4}  w="100%">
                                    <VStack space={2}  bg={"green.200"}  w="100%" p={"3"}>
                            
                                        <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>id: <Text fontSize ="17" fontWeight= '800' color={"black"}>{key=data.item.id}</Text> </Text>
                                        <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan' >Cliente: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.nome=data.item.nomeLocatario}</Text> </Text>
                                        <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan' >CPF: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.cpf = data.item.cpfLocatario}</Text></Text>
                                        <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>Data de nascimento: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.dataNascimento = data.item.dataNascLocatario}</Text> </Text>
                                        <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>Assino Contrato: <Text color={"#191970"}>{this.props.dataAssiContrato = data.item.dataLocLocatario}</Text> </Text>
                                        <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>Vencimento do aluguel: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.dataPagaLuguel = data.item.dataVencimentoAlugLocatario}</Text> </Text>
                                        
                                    </VStack>
                             
                                </VStack>
                                
                         </Stack>
                         <Box style={homeStyle.containButtLista}>
                                                       
    
                                                       <Pressable   onPressIn={() => this.remover( this.props.id = elementoLista.id)} >
                                                           
                                                       {({ isPressed }) => {
                                                           return <Box bg={isPressed ? "blue" :"#2f4f4f"}
                                                           style={{transform: [{ scale: isPressed ? 0.9 : 0.7 } ]
                                                           }}
                                                               rounded="10" overflow="hidden" borderWidth="2" borderColor="coolGray.300" width={200} maxW="96" shadow="5"  p="3" >
                           
                                                               <Text color="white" fontSize="25" fontWeight="900" textAlign={"center"}>
                                                               Excluir
                                                               </Text>
                                                           </Box>;
                                                       }}
                                                       </Pressable>
                                                   </Box>
              </Box>
    
                                               
      </Box>;
        
    </Box>
               


        );
    }


    render() {
        
        

       
        return (
        <SafeAreaView>
            <FlatList
                data={this.state.dataSource}
                renderItem={item => this.montarItemLista(item)}
                keyExtractor={item => item.id.toString()} />

        </SafeAreaView>
           

        ) 
        
    }
}








const estilos = StyleSheet.create({
    containerLista: { margin: 5, borderWidth: 5, borderColor: '#2f4f4f', padding: 5 },
    testos: { fontSize: 17, fontWeight: '700', color: 'white' },


})


