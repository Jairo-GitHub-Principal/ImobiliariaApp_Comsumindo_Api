import React,{Component} from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';


const containerTelaCadastro = StyleSheet.create({
    preenchimentoFundoScrollView:{backgroundColor:'#483d8b',padding:10,borderWidth:2,borderColor:'#9400d3',flex:1},
    preenchimentoFundoView:{alignContent:'center',justifyContent:'center'}


})


const telaDeCadastrostilo = StyleSheet.create({

    titulo:{ fontSize:18, fontWeight:'700',color:'white',margin:'5%',textAlign:'center'}
})

const imagensCasas = StyleSheet.create({
    
})

const textTelaDeCadastro = StyleSheet.create({
    viewEntradaDados:{width:'100%',alignItems:'center',margin:'1%'},
    textText:{color:'white',marginTop:40},
    textTextImput:{borderWidth:2,borderColor:'#9400d3',backgroundColor:'#4b0082', borderRadius:30,height:40,width:'100%',color:'white',textAlign:'center'}
    
})

const botao = StyleSheet.create({
    viewBotao:{flexDirection:'column', width:'100%',alignItems:'center',margin:'3%',justifyContent:'center'},
    botaoCadastrar:{backgroundColor:'#cd5c5c',width:wp(44),height:hp(5), borderRadius:30,margin:5},
    textBotao:{color:'white',textAlign:'center',marginTop:5}
})

const telaInicial = StyleSheet.create({
    containerTelaInicial:{ width:wp(100),height:hp(90),backgroundColor:'#6a5acd'}
})

const listagem = StyleSheet.create({
    imgLisatagem:{width:wp(90),height:hp(50),backgroundColor:'black'},
    viewListaAtributosImoveis:{width:wp(90),margin:10},
    textAtributosListaImoveis:{color:"white",fontSize:18,fontWeight:'700'}
})

const ContainerbotaoTelaListagem = StyleSheet.create({
    botaoEdtitRemove:{backgroundColor:'#cd5c5c',width:wp(43),height:hp(5), borderRadius:30,margin:5},
    containerBotoes:{flex:1,flexDirection:'row',width:wp(90),alignItems:'center',justifyContent:'center'},
    textBotaoRemoverEditar:{color:'white',textAlign:'center',marginTop:5}
})

const camera = StyleSheet.create({
   
    
    capture: {
        
        backgroundColor: '#fff',
        borderRadius: 10,
        height:50,
       width:wp(90),
       marginLeft:5,
       alignContent:'center',
       justifyContent:'center',
       borderWidth:3,
       borderColor:'#9400d3'

       
       
    },

   

})

export{telaDeCadastrostilo,containerTelaCadastro,imagensCasas,textTelaDeCadastro,botao,telaInicial,listagem,ContainerbotaoTelaListagem,camera}