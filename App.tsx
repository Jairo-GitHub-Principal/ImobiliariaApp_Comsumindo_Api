import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //stack navigation
import { NativeBaseProvider, Box } from "native-base";

import Home from "./src/componentes/telainicial";






const stack = createNativeStackNavigator();
export default function App() {
    return (
      <NativeBaseProvider>
        <NavigationContainer >
            <stack.Navigator  screenOptions={{ headerShown: false }}>
                <stack.Screen name="Home" component={Home}/>
                
            </stack.Navigator>

        </NavigationContainer>
        </NativeBaseProvider>
    )

}



