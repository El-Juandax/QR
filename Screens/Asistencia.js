import { Text, View, StyleSheet, TextInput, Touchable } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Asistencia() {

    const [Nombre, setNombre] = useState('');
    const [Fecha, setFecha] = useState('');
    const [Actividad, setActividad] = useState('');
    const [Ficha, setFicha] = useState('');
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState({
        Nombre: '',
        Correo: '',
        Contraseña: ''
    });

    useEffect(() =>{
        obtenerDatos = async () =>{
            const dato = await AsyncStorage.getItem('Usuario')
            setUsuario(JSON.parse(dato))
            setNombre(JSON.parse(dato).Nombre)
        }
        obtenerDatos()
    }, []);

    const handlePressButton = async () =>{
        if(Nombre === '' || Fecha === '' || Actividad === '' || Ficha === ''){
            alert('Por favor rellene todos los campos')
        }else{
            const Asistencia={
                Nombre: Nombre,
                Fecha: Fecha,
                Actividad: Actividad,
                Ficha: Ficha
            }

            const Asistencias = await AsyncStorage.getItem('Asistencias')
            const AsistenciaIndividual = Asistencias ? JSON.parse(Asistencias) : []
            AsistenciaIndividual.push(Asistencia)
            await AsyncStorage.setItem('Asistencias', JSON.stringify(AsistenciaIndividual))
            alert('Asistencia registrada')
            navigation.navigate('Inicio')
        }

   
    }
    return (
      <View style={styles.body}>
        <View style={styles.container}>
            <View style={styles.cuadrito}>
                <TouchableOpacity style={styles.qrBoton} onPress={() => navigation.navigate('QrScreen')}><Text style={{color: 'white', fontWeight: 'bold'}}>Escanear QR</Text></TouchableOpacity>
            </View>
            <TextInput style={styles.campos} placeholder='Nombre' onChangeText={(text) => setNombre(text)} value={Nombre}/>
            <TextInput style={styles.campos} placeholder='Fecha' onChangeText={(text) => setFecha(text)} value={Fecha}/>
            <TextInput style={styles.campos} placeholder='Actividad' onChangeText={(text) => setActividad(text)} value={Actividad}/>
            <TextInput style={styles.campos} placeholder='Ficha' onChangeText={(text) => setFicha(text)} value={Ficha}/>
            <TouchableOpacity style={styles.botonA} onPress={handlePressButton}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Registrar Asistencia</Text></TouchableOpacity>
        </View>
      </View>
    )
}

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#E6E100',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container:{
        width: 340,
        height: 600,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center'
    },
    cuadrito:{
        marginTop: 20,
        width: 300,
        height: 200,
        borderWidth: 5,
        borderColor: '#E58F00',
        borderStyle: 'solid',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    campos:{
        marginTop: 20,
        width: 300,
        height: 50,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 5,
        borderColor: '#E58F00',
        borderStyle: 'solid',
        paddingHorizontal: 10,
        fontSize: 20,
    },
    botonA:{
        marginTop: 20,
        backgroundColor: '#E58F00',
        width: 150,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrBoton:{
        backgroundColor: '#E58F00',
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
  })


