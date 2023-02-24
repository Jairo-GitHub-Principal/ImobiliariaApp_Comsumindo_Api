import React, { Component } from "react";
import { TouchableOpacity, ScrollView, StyleSheet,Image, _Text } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LogBox } from "react-native/Libraries/LogBox/LogBox";
import { Box,Text,Pressable,AspectRatio,Center,Stack,Heading,HStack,VStack } from "native-base";


import { homeStyle } from "../estilos/estilos";


import ItemDatabase from "../databases/ItemDatabase";







export default class ListagemCliente extends Component {
    

    constructor(props) {

        super(props)
        this.state = {
            listaDecliente: [],
            
        }
        
        this.ListarCliente()
        
      
    }



    ListarCliente = () => {
        const DB = new ItemDatabase()
        DB.Listar().then(listaCompleta => { this.setState({ listaDecliente: listaCompleta }) })

    }

    remover = (id) => {

        const DB = new ItemDatabase();
        DB.Remover(id);
        this.ListarCliente()
    }

    update=()=>{

    }


    render() {
        
        

       
        return (




            <ScrollView style={{ backgroundColor: '#738c7b' }} >
               
                { this.state.listaDecliente.map(elementoLista =>( 
                    
                   
                    
<Box m={3} >
                          
                    
                           
                       
                            
                       


                       

                       
                        
        
        
        
        
        
        
    <Box alignItems="center" w={"100%"} >
        
          <Box maxW="100%" rounded="lg" overflow="hidden" borderColor="black.200" borderWidth="2" 
                _light={{ borderColor: "green.500",backgroundColor: "green.200"}} 
                    _web={{shadow: 2,borderWidth: 0 }} 
                       _dark={{ backgroundColor: "gray.50" }}>
                         
                         <Box>
                            <AspectRatio w="100%" ratio={13 / 9}>
                            <Image source={{uri:elementoLista.imgDoAnuncio}} alt="image" />
                            </AspectRatio>
                        </Box>

                        <Stack p="1" space={3}> 
                             <VStack  space={4}  w="100%">
                                <VStack space={2}  bg={"green.200"}  w="100%" p={"3"}>
                        
                                    <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>id: <Text fontSize ="17" fontWeight= '800' color={"black"}>{key=elementoLista.id}</Text> </Text>
                                    <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan' >Cliente: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.nome=elementoLista.nome}</Text> </Text>
                                    <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan' >CPF: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.cpf = elementoLista.cpf}</Text></Text>
                                    <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>Data de nascimento: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.dataNascimento = elementoLista.dataNascimento}</Text> </Text>
                                    <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>Assino Contrato: <Text color={"#191970"}>{this.props.dataAssiContrato = elementoLista.dataAssiContrato}</Text> </Text>
                                    <Text fontSize ="18"  fontWeight= '900' color = 'darkcyan'>Vencimento do aluguel: <Text Text fontSize ="17" fontWeight= '800' color={"#191970"}>{this.props.dataPagaLuguel = elementoLista.dataPagaLuguel}</Text> </Text>
                                    
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
                                



                    


                                      

                    )




                )
                

                
            

                   
                }


 

            </ScrollView>


        ) 
        
    }
}








const estilos = StyleSheet.create({
    containerLista: { margin: 5, borderWidth: 5, borderColor: '#2f4f4f', padding: 5 },
    testos: { fontSize: 17, fontWeight: '700', color: 'white' },


})


