import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// responsividade
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// estilos
import { containerTelaCadastro, listagem, ContainerbotaoTelaListagem } from "../estilos/estilosImoveis";
import { Image, ScrollView, Button,SafeAreaView, FlatList,TextInput,Modal } from 'react-native';
import { Box, Text, Pressable, AspectRatio, Center, Stack, Heading, HStack, VStack,useDisclose } from "native-base";

// telas

import AlugarImovel from "./alugarImovel";

// import de uma const da tela AlugarImoveis
import { idImovel } from "./alugarImovel";
import { TouchableOpacity } from "react-native-gesture-handler";

// import do item model



// @ts-nocheck



function x (id){
    idCasa = id;
    return idCasa;
}


 class ListarImoveis extends Component {

    
    setNavegador = (novoNavegador) => {
        navegador = novoNavegador
      }
    constructor(props) {

        super(props)
        this.state = {

            loading: false,
            dataSource: [],
            locatarioID: 0,
            locatarioID2: 0,
            statusImovel: "Imovel Disponivel",
            statusBoato: "Alugar",
            modalVisible: false,
            size: "md",
            IdDisponivelParaAluguel:0,
         

            // state para implementar uma navegação dentro de uma class


        }

       
    }


    

   
    componentDidMount() {
        this.recuperarDados();
    }
    recuperarDados = () => {
        this.setState({ loading: true });
        fetch("http://192.168.1.4:5000/WebAPI_ImobiliariaSantos/api/Imoveis") // acesso para que o mobile possa acessar o servidor kestrel, que esta no computador local, por mais que estamos execultando um emulador onde rodamos um dispositivo mobile, no sistema do conputador local, o acesso do dispositivo mobile, ao servidor kestrel, é feito de forma que simula, um dispositivo real, de fora do computador onde roda o emulador

            .then(response => response.json())  // recuperação e conversão dos dados retornados
            .then((dadosJson) => {
                this.setState({ loading: false, dataSource: dadosJson });

                // teste para ver se a requisição esta funcionando como deveria

                console.log('dados recuperados');
                for (let i in dadosJson) {
                    console.log(dadosJson[i].finalidadeImovel);
                }

            }) // recupera dados e os transmite ao state do componente, permitindo que os dados sejam atualizados em tela

            .catch(error => console.log("falha ao recuperar dados: " + error)); // fallback para caso de erro, retorna uma msg de erro, caso aja falha no acesso ao DB
    }



    // alugar Imovel:
    // o imovel alugado vai ficar com um titulo de imovel alugado e o estatos do botão 
    // vai ficar como alugado, 
    AlugarImovel = (locatarioID) => {
        if (locatarioID > 0) {
            this.setState({ locatarioID2: locatarioID });
            this.setState({ statusImovel: "Imovel Alugado", statusBoato: "Alugado" })
            this.alugado(this.state.locatarioID2);
        }

    }
    // marcar como alugado

    alugado = () => { // vai mudar o background do imovel alugado, sugerindo que o mesmo esteja indisponivel

        if (this.state.locatarioID2 > 0) {
            return { borderColor: "red.600", backgroundColor: "red.400" }
        } else {
            return { borderColor: "green.500", backgroundColor: "green.200" }
        }


    }




    
    // montar as propriedades da lista  nos compenentes de visualização:

    montarItemLista = (data) => {
    
         return (
        
            

            <Box  maxW="100%" rounded="lg" borderColor="black.200" borderWidth="2" m={1} alignItems={"center"}
                _light={this.alugado()}
                _web={{ shadow: 2, borderWidth: 0 }}
                _dark={{ backgroundColor: "gray.50" }} >
                <Box >
                    <AspectRatio w="100%" ratio={13 / 9} bg="cyan.500">
                        <Image source={{ uri: data.item.imagemImovel }} alt="image" />
                    </AspectRatio>
                </Box>


                <Box >
                    <Stack p="1" space={3}>
                        <VStack space={4} w="100%">
                            <VStack space={2} w="100%" p={"3"}>

                                <Text fontSize="18" fontWeight='900' color='darkcyan'>id: <Text fontSize="17" fontWeight='800' color={"black"}>{key = data.item.id}</Text> </Text>
                                <Text fontSize="18" fontWeight='900' color='darkcyan' >Tipo: <Text Text fontSize="17" fontWeight='800' color={"#191970"}> {this.props.tipo = data.item.tipoImovel}</Text> </Text>
                                <Text fontSize="18" fontWeight='900' color='darkcyan' >Endereço: <Text Text fontSize="17" fontWeight='800' color={"#191970"}> {this.props.endereco = data.item.enderecoImovel}</Text></Text>
                                <Text fontSize="18" fontWeight='900' color='darkcyan'>Finalidade: <Text Text fontSize="17" fontWeight='800' color={"#191970"}> {this.props.finalidade = data.item.finalidadeImovel}</Text> </Text>
                                <Text fontSize="18" fontWeight='900' color='darkcyan'>Descrição: <Text color={"#191970"}> {this.props.descricao = data.item.descricaoImovel}</Text> </Text>
                                <Text fontSize="18" fontWeight='900' color='darkcyan'>Preço: <Text Text fontSize="17" fontWeight='800' color={"#191970"}> {this.props.valor = data.item.precoImovel}</Text> </Text>

                                <Text fontSize="18" fontWeight='900' color='darkcyan'>Locatario ID: <Text Text fontSize="17" fontWeight='800' color={"#191970"}> {this.props.IDloc = data.item.IDlocatario}</Text> </Text>

                              
                            </VStack>

                        </VStack>
                    </Stack>


                </Box>


                <Box flexDirection="row" >


                    <Pressable  onPress={()=> navegador.navigate("AlugarImovel")} >
                        {({ isPressed }) => {
                            return <Box bg={isPressed ? "blue" : "#2f4f4f"}
                                style={{ transform: [{ scale: isPressed ? 0.9 : 0.7 }] }}
                                rounded="10" overflow="hidden" borderWidth="2" borderColor="coolGray.300" width={200} maxW="96" shadow="5" p="3" >
                                <Text color="white" fontSize="25" fontWeight="900" textAlign={"center"}>{this.state.statusBoato} </Text>
                            </Box>;
                        }}
                    </Pressable>

                    <Pressable
                       
                        >
                        {({ isPressed }) => {
                            return <Box bg={isPressed ? "blue" : "#2f4f4f"}
                                style={{ transform: [{ scale: isPressed ? 0.9 : 0.7 }] }}
                                rounded="10" overflow="hidden" borderWidth="2" borderColor="coolGray.300" width={200} maxW="96" shadow="5" p="3" >
                                <Text color="white" fontSize="25" fontWeight="900" textAlign={"center"}> Excluir</Text>
                            </Box>;
                        }}
                    </Pressable>
                </Box>

               
            </Box>


        )
    }





    render() {


        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={item => this.montarItemLista(item)}
                    keyExtractor={item => item.id.toString()} 
                    />

            </SafeAreaView>
        );
    }
}



export const List = new ListarImoveis(); 
const IdImovelDisponivel = idImovel;
const stack = createNativeStackNavigator();



export default function ListarImoveisApi() {
    return (

        <stack.Navigator screenOptions={{ headerShown: false }}>
           
            <stack.Screen name="listar Imovél">
                { 
                    ({navigation})=>{
                        List.setNavegador(navigation)
                        return(<ListarImoveis/>)
                    }
                }
            </stack.Screen>

                <stack.Screen name="alugar Imovél">
                { 
                    ({num})=>{
                        IdImovelDisponivel.setIDImovelDisponivel(num)
                        return(<AlugarImovel/>)
                    }
                }
                    
                </stack.Screen>
          

        </stack.Navigator>

    )

}



//this.AlugarImovel(this.state.locatarioID)}

/**
 * 
 *   <Text style={{ textAlign: 'center', color: 'green', fontWeight: '700', fontSize: 18 }} >{this.props.status = this.state.statusImovel}</Text>
                                {this.state.locatarioID < 1 ?
                                    <TextInput placeholder="Informe o ID do locatario" placeholderTextColor="#ff7f50" style={{ borderWidth: 2, borderColor: 'gray', borderRadius: 20, color: "red", fontSize: 18, fontWeight: "bold", textAlign: 'center' }} onChangeText={(text) => this.setState({ locatarioID: text })}></TextInput>
                                    : <Text></Text>}
 */