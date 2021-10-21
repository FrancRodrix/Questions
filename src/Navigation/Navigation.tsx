import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/HomeScreen'
import Details from '../Screens/Details';
import Weather from '../Screens/weather'
const Stack =createNativeStackNavigator();

const Navigation=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown:false}}
                />
                <Stack.Screen
                name="Details"
                component={Details}
                options={{headerShown:false}}
                />
                 <Stack.Screen
                name="Weather"
                component={Weather}
                options={{headerShown:false}}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
};
export default Navigation;