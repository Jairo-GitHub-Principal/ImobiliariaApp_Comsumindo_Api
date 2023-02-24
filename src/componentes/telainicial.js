import * as React from "react";
import { Image, ScrollView, _Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //stack navigation
import { Box, Text, Pressable, Button, Center, Flex, Spacer, HStack, Badge, } from "native-base";

import CadastarListarCliente from "./cadastroEListagem";
import ListagemCliente from "./listagemCliente";
import CadastroImoveisNav from "./cadastroDeimóvel";
import ListarImovel from "./listarImoveis";



import { homeStyle } from "../estilos/estilos";
import { LogBox } from "react-native/Libraries/LogBox/LogBox";


//_____________________importes dos componentes que se comunicaraõ com a API________________________________
import ListarImoveisApi from "../componentesFalaApi/listagemImoveisApi";
import CadastroImoveisApi from "../componentesFalaApi/cadastroDeimóvelApi";






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
                        
                        <Pressable onPress={() => navigation.navigate("cadastro") }maxW="96">
                            
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

                           

                        
                        

                        <Pressable  onPress={() => navigation.navigate("listagem")} >
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

                            <Pressable  onPress={() => navigation.navigate("cadastrarImovelApi")}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box  bg={isPressed ? "green.500" : isHovered ? "primary" : "#6b8e23"}
                                style={{transform: [{ scale: isPressed ? 0.9 : 1 } ]
                                }}
                                    rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={250} maxW="96" shadow="3"  p="5" mb={30}  >

                                    <Text color="black" fontSize="17" fontWeight="black" textAlign={"center"}>
                                        Cadastrar Imóveis c/ API
                                    </Text>
                                </Box>;
                            }}
                            </Pressable>

                            <Pressable  onPress={() => navigation.navigate("listarImovelApi")}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box bg={isPressed ? "blueGray.500" : isHovered ? "primary" : "#4682b4"}
                                style={{transform: [{ scale: isPressed ? 0.9 : 1 } ]
                                }}
                                    rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={250} maxW="96" shadow="3"  p="5">

                                    <Text color="black" fontSize="17" fontWeight="black" textAlign={"center"}>
                                        Imóveis Cadastrados c/ API
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
           
            
            <stack.Screen name="Home" component={TelaInicial} />
            <stack.Screen name="cadastro" component={CadastarListarCliente} />
            <stack.Screen name="listagem" component={ListagemCliente} />
            <stack.Screen name="cadastrarImoveis" component={CadastroImoveisNav} />
            <stack.Screen name="listarImaveis" component={ListarImovel} />
            <stack.Screen name="listarImovelApi" component={ListarImoveisApi} />
            
            <stack.Screen name="cadastrarImovelApi" component={CadastroImoveisApi} />
          

        </stack.Navigator>

    )

}


// estilos de cores native base para botoes

