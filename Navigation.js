import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Inicio from './Screens/Inicio';
import Asistencia from './Screens/Asistencia';
import QrScreen from './Screens/QrScreen';


const stack = createNativeStackNavigator();

export default function Navigation (){
    return (
        <NavigationContainer>
        <stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <stack.Screen name="Login"  component={Login}/>
            <stack.Screen name="Register"  component={Register}/>
            <stack.Screen name="Inicio" component={Inicio} options={{headerShown: true, headerStyle:{backgroundColor: '#E58F00'}, headerTintColor: '#fff', headerLeft: null, headerTitleStyle:{fontWeight: 'bold'} }}/>
            <stack.Screen name="Asistencia" component={Asistencia} options={{headerShown: true, headerStyle:{backgroundColor: '#E58F00'}, headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'} }}/>
            <stack.Screen name="QrScreen" component={QrScreen} options={{headerShown: true, headerStyle:{backgroundColor: '#E58F00'}, headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'} }}/>
        </stack.Navigator>
        </NavigationContainer>
        )
  }

