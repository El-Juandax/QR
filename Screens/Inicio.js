import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Inicio(){
    
    const navigation = useNavigation();

    const cerrarSesion = async () =>{
        await AsyncStorage.removeItem('Usuario')  
        navigation.navigate('Login')
    }
    const presion = () =>{
        navigation.navigate('Asistencia')
        console.log('SWX')
    }

    return (
      <View style={styles.body}>
        <View style={styles.container}>
            <View style={styles.cuadrito}><TouchableOpacity onPress={presion}>
                <Image style={styles.imagen} source={require('../src/Img/QR.png')}/>
                <View style={{width: 100, height: 3, backgroundColor: '#E58F00', marginTop: 10, marginBottom: 10, borderRadius: 10}}></View>
        <Text style={{fontSize: 17}}>Escanear QR</Text>
        </TouchableOpacity>
        </View>
            
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#E58F00', width: 250}}>OPRIMA EL CODIGO QR PARA REGISTRAR SU ASISTENCIA</Text>
        </View>
        
        <TouchableOpacity onPress={cerrarSesion} style={styles.BotonC}><Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Cerrar Sesión</Text></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#E6E100',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    BotonC:{
        marginTop: -60,
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E58F00',
        borderRadius: 10,
    },
    container:{
        marginTop: 50,
        marginBottom: 150,
        width: 300,
        height: 400,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    cuadrito:{
        marginTop: 30,
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 5,
        borderColor: '#E58F00',
        borderStyle: 'solid',
    },
    imagen:{
        width: 100,
        height: 100,
        justifyContent: 'center',
    }
})

