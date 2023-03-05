import {StyleSheet} from "react-native";

const StyleLista = StyleSheet.create({
    container:{
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "#FFF",
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    line: {
       
        flexDirection: "column",
        borderColor: "green",
        borderWidth:2,
        marginLeft: 10,
        marginRight: 10
    },
    info:{
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    name: {
        fontSize: 18,
        fontWeight: "bold"
    },
    desc: {
        fontSize: 17
    },
    price:{
        fontSize:14,
        color: "#060"
    }

})


const StylePedido = StyleSheet.create({
    inputText:{
        margin:5,
        borderColor:"#ccc", 
        borderWidth:1
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign:"center"
    },
    price:{
        fontSize:18,
        color: "#060",
        textAlign:"left",
        marginBottom: 10
    }

});
export {StyleLista,StylePedido};
                