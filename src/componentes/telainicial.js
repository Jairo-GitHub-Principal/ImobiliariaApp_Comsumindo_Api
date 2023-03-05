import * as React from "react";
import { Image, ScrollView, _Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //stack navigation
import { Box, Text, Pressable, Button, Center, Flex, Spacer, HStack, Badge, } from "native-base";


import { homeStyle } from "../estilos/estilos";
import { LogBox } from "react-native/Libraries/LogBox/LogBox";


//_____________________importes dos componentes que se comunicaraõ com a API________________________________
import CadastrarLocatarioApi from "../componentesFalaApi/cadastroLocatarioApi";
import ListarImoveisApi from "../componentesFalaApi/listagemImoveisApi";
import CadastroImoveisApi from "../componentesFalaApi/cadastroDeimóvelApi";
import ListagemLocatario from "../componentesFalaApi/listagemLocatariosApi";
import ListarImoveisPorIDApi from "../componentesFalaApi/listarPorId";
import AlugarImovel from "../componentesFalaApi/alugarImovel";



// teste de envio de dados entre telas 







function TelaInicial({ navigation }) {
    const logo = require('../img/LogoSantosImobiliaria.png')


    return (
        
        <ScrollView style={{ backgroundColor: '#738c7b' }} >

            <Box style={{ marginBottom: 50, flexDirection: 'row', backgroundColor: '#869D92', width: '100%', alignItems: 'center', paddingTop: 10, justifyContent: 'space-between', }}>
                <Text style={{ color: 'white', marginLeft: 30, fontSize: 20 }}>SantosImobiliária</Text>
                <Image source={logo} style={{ marginRight: 30, width: 100, height: 55 }}></Image>
            </Box>

            <Flex  alignItems="center">

              
                    <Box flex={1}  flexDirection="column"   alignItems="center" >
                        
                        <Pressable onPress={() => navigation.navigate("cadastrar Locatario") }maxW="96">
                            
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box bg={isPressed ? "green.900" : isHovered ? "primary" : "#556b2f"} 
                                style={{ transform: [{ scale: isPressed ? 0.9 : 1 }] }}
                                rounded="30"  borderWidth="1" borderColor="coolGray.300" width={250} maxW="96" shadow="3" p="5" mb="30">

                                    <Text color="black" fontSize="17" fontWeight="black" textAlign={"center"}>
                                        Cadastrar clientes
                                    </Text>

                                    
                                </Box>;
                            }}
                            </Pressable>

                           

                        
                        

                        <Pressable  onPress={() => navigation.navigate("listar Locatario")} >
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box bg={isPressed ? "blue.900" : isHovered ? "primary" : "#5f9ea0"} 
                                style={{transform: [{ scale: isPressed ? 0.9 : 1 } ]
                                }}
                                    rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={250} maxW="96" shadow="3"  p="5" mb={30}  >

                                    <Text color="black" fontSize="17" fontWeight="black" textAlign={"center"}>
                                        Clientes cadastrados
                                    </Text>
                                </Box>;
                            }}
                            </Pressable>

                            <Pressable  onPress={() => navigation.navigate("cadastrar Imovél")}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box  bg={isPressed ? "green.500" : isHovered ? "primary" : "#6b8e23"}
                                style={{transform: [{ scale: isPressed ? 0.9 : 1 } ]
                                }}
                                    rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={250} maxW="96" shadow="3"  p="5" mb={30}  >

                                    <Text color="black" fontSize="17" fontWeight="black" textAlign={"center"}>
                                        Cadastrar imóveis
                                    </Text>
                                </Box>;
                            }}
                            </Pressable>

                            <Pressable  onPress={() => navigation.navigate("listar Imovél")}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box bg={isPressed ? "blueGray.500" : isHovered ? "primary" : "#4682b4"}
                                style={{transform: [{ scale: isPressed ? 0.9 : 1 } ]
                                }}
                                    rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={250} maxW="96" shadow="3"  p="5">

                                    <Text color="black" fontSize="17" fontWeight="black" textAlign={"center"}>
                                         Imóveis cadastrados
                                    </Text>
                                </Box>;
                            }}
                            </Pressable>


                            <Pressable  onPress={() => navigation.navigate("listar Imovél por ID")}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box bg={isPressed ? "blueGray.500" : isHovered ? "primary" : "#4682b4"}
                                style={{transform: [{ scale: isPressed ? 0.9 : 1 } ]
                                }}
                                    rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={250} maxW="96" shadow="3"  p="5">

                                    <Text color="black" fontSize="17" fontWeight="black" textAlign={"center"}>
                                         Imóveis 
                                    </Text>
                                </Box>;
                            }}
                            </Pressable>

                           

                            

                           
       
                        

                            
                       
                    </Box>

                   
                

            </Flex>


        </ScrollView>
    );

    LogBox.ignoreAllLogs();

}

const stack = createNativeStackNavigator();
export default function Home() {
    return (

        <stack.Navigator  >
           
            
            <stack.Screen name="Pagina inicial" component={TelaInicial} />
            <stack.Screen name="cadastrar Locatario" component={CadastrarLocatarioApi} />
            <stack.Screen name="listar Locatario" component={ListagemLocatario} />
            <stack.Screen name="listar Imovél" component={ListarImoveisApi} />
            <stack.Screen name="cadastrar Imovél" component={CadastroImoveisApi} />
            <stack.Screen name="listar Imovél por ID" component={ListarImoveisPorIDApi} />
            <stack.Screen name="AlugarImovel" component={AlugarImovel} />
           
          

        </stack.Navigator>

    )

}


// estilos de cores native base para botoes

// estilos de cores native base para botoes



/**
 * 
 *  <stack.Screen name="listar Imovél">
                {
                    ({navigation})=>{
                        notificador.setNavegador(navigation)
                        return(<ListarImoveisApi/>);
                    }
                }
                
                </stack.Screen>   
 */