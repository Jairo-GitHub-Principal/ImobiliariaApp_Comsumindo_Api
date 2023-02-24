import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';



const homeStyle = StyleSheet.create({
    botaoCadClie:{
        backgroundColor:'white',
        width:'60%',
        height:'15%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'30%',
        borderRadius:30,
        borderWidth:2,
        borderColor:'grey',

       

    },
    botaoListClie:{
        backgroundColor:'white',
        width:'60%',
        height:'15%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'10%',
        borderRadius:30,
        borderWidth:2,
        borderColor:'grey',

        
    },

    containerListagem:{},
    containButtLista:{
        flexDirection:'row',justifyContent:'space-around',
        alignItems:'center'},
        
    botaoAtualizarExcluir:{
        backgroundColor:'#2f4f4f',
        width:'40%',height:35,padding:5,
        justifyContent:'center',alignItems:'center',
        borderRadius:10,borderWidth:2,borderColor:'white', margin:5},


    testoBotao:{
        color:'black',
        fontSize:17,
        fontWeight:'bold',  
    },

    containerBotao:{ alignItems:'center', height:400}
})


const telaCadastroStyle = StyleSheet.create({
     
      containerGeral:{ backgroundColor:'#869D92'},
      containerCampo:{alignItems:'center',justifyContent:'space-between',margin:10},
      testoTituloCampo:{ fontSize:17, fontWeight:'700',color:'white'},
      inputText:{backgroundColor:'white', width:'100%',fontSize:15,fontWeight:'700',textAlign:'center',borderRadius:10},
      botaoCadastrar:{margin:10, backgroundColor:"white",width:'60%',alignItems:'center',borderRadius:10,height:40,justifyContent:'center',borderWidth:2,borderColor:'grey'},
      containerBotCadastrar:{backgroundColor:'#869D92',width:'100%',alignItems:'center'},
      textoBotaoCadastrar:{fontSize:17, fontWeight:'900',color:'#509baf'}



})


const listagem = StyleSheet.create({
    imgLisatagem:{width:wp(90),height:hp(50),backgroundColor:'black'},
    viewListaAtributosImoveis:{width:wp(90),margin:10},
    textAtributosListaImoveis:{color:"white",fontSize:18,fontWeight:'700'}
})

const containerTelaCadastro = StyleSheet.create({
    preenchimentoFundoScrollView:{backgroundColor:'#483d8b',padding:10,borderWidth:2,borderColor:'#9400d3',flex:1},
    preenchimentoFundoView:{alignContent:'center',justifyContent:'center'}


})


export {homeStyle,telaCadastroStyle,listagem,containerTelaCadastro};


