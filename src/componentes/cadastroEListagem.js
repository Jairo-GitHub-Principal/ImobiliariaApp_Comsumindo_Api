import React, { Component } from "react";
import {  TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import{Box, Input,Text,Pressable,Select,Center,FormControl,CheckIcon,WarningOutlineIcon} from 'native-base'


import { telaCadastroStyle } from "../estilos/estilos";


import Cliente from '../model/cliente';

import ItemDatabase from '../databases/ItemDatabase';
import { LogBox } from "react-native/Libraries/LogBox/LogBox";





class CadastarListarCliente extends Component {


    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            cpf: '',
            dataNascimento: '',
            dataAssiContrato: '',
            dataPagaLuguel: '',
            imgDoAnuncio: '',
            lista: []
            
        }

    }
 


    Cadastrar = (imgDoAnuncio, nome, cpf, dataNascimento, dataAssiContrato, dataPagaLuguel) => {


        const novoCliente = new Cliente(imgDoAnuncio,nome, cpf, dataNascimento, dataAssiContrato, dataPagaLuguel);
        const DB = new ItemDatabase();
        DB.Inserir(novoCliente);
        this.ListarDados()


        //this.state.lista.push(novoCliente)
        //this.forceUpdate();



    }

    atualizar = (item) => {
        /*
        const banco = new ItemDatabase();
        banco.Atualizar(item);
        this.ListarDados();
        */
    }

    ListarDados = () => {
        const DB = new ItemDatabase()
        DB.Listar().then(listaCompleta => { this.setState({ lista: listaCompleta }) })

        // const banco = new ItemDatabase(); // criamos uma instancia de ItemDatabase

        /* chama o metodo Listar(). chama o metodo then(o metodo then recebe por parametro uma variavel  "listaComplera" que armazena nela o retorno do metodo listar(), ainda implementando o parametro de then, chamaos uma função => eroow function
            que no seu scopo vai chamar o metodo setstate(que vai pegar o retorno do metodo listar, que foi armazenado na variavel "listaCompleta,e acrescentar no vetor lista") )*/
        //banco.Listar().then(listaCompleta => { this.setState({ lista: listaCompleta }) });


    }

    remover = (id) => {

        const DB = new ItemDatabase();
        DB.Remover(id);
        this.ListarDados();
    }

   
    
  

    render() {

        const pickImageFromGalery = async () => {

            const options = { midiaType: 'photo' };
            const result = await launchImageLibrary(options);
      
            if (result.assets) {
      
              const img = result.assets[0].uri // pra pegar somente a uri
      
              console.log(JSON.stringify(img))
      
              this.setState({ imgDoAnuncio: img })
            }
          }



          Camera = () => {
            let options = {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            launchCamera(options, (response) => {
              console.log('Response = ', response);
        
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                 imgDoAnuncio: response.assets[0].uri
    
                });
                const img = this.state.imgDoAnuncio
    
                CameraRoll.save(img);
                console.log(img);
              }
            });
        
          }
    
    

        
    
    
               
          



        



        const logo = require('../img/LogoSantosImobiliaria.png')

        const handleImagemUser = () => { // cria um tipo de modal alert pra mim escolher dentro dele entre uma das opções
            Alert.alert(
                "selecione", "Escolha de onde selecionar a imagem",
                [
                    {
                        text: "Galeria",
                        onPress: () => pickImageFromGalery(), // chama função que chama a galeria
                        style: "default"
                    },

                    {

                        text: "Camera",
                        onPress: () => Camera(), // chama a função que chama a camera
                        style: "default"
                    },

                    {
                        text: "Cancelar",
                        onPress: () => Alert.alert("Cancelado pelo usuario"),
                        style: "default",
                    },

                ],
                {
                    // mensagem e confirmação do cancelamento da ação de selecionar imagem 
                    cancelable: true,
                    onDismiss: () => console.log("ação cancelada")

                }
            )
        }


        return (

            <ScrollView style={{backgroundColor: '#869D92'}} >


                <Box style={{ flexDirection: 'row', backgroundColor: '#869D92', width: '100%', alignItems: 'center', paddingTop: 10, justifyContent: 'space-between', }}>
                    <Text style={{ color: 'white', marginLeft: 30, fontSize: 20 }}>SantosImobiliária</Text>
                    <Image source={logo} style={{ marginRight: 30, width: 100, height: 55 }}></Image>
                </Box>
                <Box style={telaCadastroStyle.containerGeral}>

                    <Box style={telaCadastroStyle.containerCampo}>

                        <TouchableOpacity onPress={() => handleImagemUser()} >
                            

                            {this.state.imgDoAnuncio ? //  se imagem da camera foi capturada é verdadeiro, as caracteristicas de estilo em Image sera aplicada na imgem capturada para que ela seja exibida em uma previsualização na propria tela de cadastro e a mesma sera exibida antes de  salvar os dados
                            
                                <Box style={{ width:wp(95)}} >
                                   
                                    <Image style={{ alignSelf: 'center', width:wp(90),height:250 }} source={{ uri: this.state.imgDoAnuncio }} />

                                </Box>
                                : // se não se a condição this.state.anuncio_image for falso, não havera alteração e continuara aparecendo o texto abaixo
                                <Box>
                                <Text style={{fontSize:17,fontWeight:'600',color:'red'}}>Adicionar Imagem: click aqui</Text>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', margin: '2%', marginBottom: 50 }} >nenhuma imagem selecionada</Text>
                                </Box>
                            }

                        </TouchableOpacity>
                    </Box>



                    <Box style={telaCadastroStyle.containerCampo}>
                        <Text style={telaCadastroStyle.testoTituloCampo}>Nome:</Text>
                      
                        <Input onChangeText={(valorDig) => this.setState({ nome: valorDig })} 
                        variant="rounded" placeholder="digite o nome do locador" bg={"amber.100"} textAlign="center"
                        fontWeight={'black'} fontSize={18} 
                        />
                                 
                        
                        
                    </Box>

                    <Box style={telaCadastroStyle.containerCampo}>
                        <Text style={telaCadastroStyle.testoTituloCampo}>CPF:</Text>
                            <Input  onChangeText={(valorDig) => this.setState({ cpf: valorDig })}

                             variant="rounded" placeholder="CPF locador"  bg={"amber.100"} textAlign="center" 
                             fontWeight={'black'} fontSize={18}
                             />
                    </Box>

                    <Box style={telaCadastroStyle.containerCampo}>
                        <Text style={telaCadastroStyle.testoTituloCampo}>Data de Nascimento:</Text>
                        
                            <Input  onChangeText={(valorDig) => this.setState({ dataNascimento: valorDig })}
                             variant="rounded" placeholder="data nascimento do locatario"  bg={"amber.100"} textAlign="center"
                             fontWeight={'black'} fontSize={18} />
                    </Box>

                    <Box style={telaCadastroStyle.containerCampo}>
                        <Text style={telaCadastroStyle.testoTituloCampo}>Data de Locação:</Text>
                        
                            <Input onChangeText={(valorDig) => this.setState({ dataAssiContrato: valorDig })}
                             variant="rounded" placeholder="data que o locatario assinou contrato"  bg={"amber.100"} textAlign="center" 
                             fontWeight={'black'} fontSize={18}/>
                    </Box>

                    <Box style={telaCadastroStyle.containerCampo}>
                        <Text style={telaCadastroStyle.testoTituloCampo}>Vencimento:</Text>
                        
                            <Input  onChangeText={(valorDig) => this.setState({ dataPagaLuguel: valorDig })}
                             variant="rounded" placeholder="data de vencimento do aluguel"  bg={"amber.100"} textAlign="center" 
                             fontWeight={'black'} fontSize={18}/>
                    </Box>

                    <Box style={telaCadastroStyle.containerCampo}>
                        <Text style={telaCadastroStyle.testoTituloCampo}>Imovel alugado:</Text>
                        
                        <Center>
      <FormControl w="3/4" maxW="300" isRequired isInvalid>
        <FormControl.Label>Choose service</FormControl.Label>
        <Select minWidth="300" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size={3} />
      }} mt="1">
          <Select.Item label="Casa" value="Casa" />
          <Select.Item label="Apartamento" value="Apartamento" />
          <Select.Item label="Ponto Comercial" value="Ponto Comercial" />
          
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
         selecão obrigatoria
        </FormControl.ErrorMessage>
      </FormControl>
    </Center>;
                    </Box>



                </Box>

                <Box style={{ alignItems: 'center', justifyContent: 'center' }}>
                   

                    <Pressable   onPressIn={() => this.Cadastrar(this.state.imgDoAnuncio,this.state.nome, this.state.cpf, this.state.dataNascimento, this.state.dataAssiContrato, this.state.dataPagaLuguel)}>
                            {({ isHovered, isFocused, isPressed }) => {
                                return <Box bg={isPressed ? "blue" :"coolGray.200"}
                                style={{transform: [{ scale: isPressed ? 0.9 : 0.7 } ]
                                }}
                                    rounded="30" overflow="hidden" borderWidth="2" borderColor="coolGray.300" width={250} maxW="96" shadow="5"  p="3" >

                                    <Text color="#509baf" fontSize="25" fontWeight="900" textAlign={"center"}>
                                    Salvar
                                    </Text>
                                </Box>;
                            }}
                            </Pressable>
                </Box>



            </ScrollView>
            
        )
                            LogBox.ignoreAllLogs()
    }
    

}


export default CadastarListarCliente;




