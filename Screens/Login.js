import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(){
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const navgation = useNavigation();

    const ValidarUsuario = async () => {
        const datos = await AsyncStorage.getItem('DatosUsuarios');
        const dato = JSON.parse(datos) || [];

        const verificacionUsuario = dato.find((Usuarios) => Usuarios.Correo === Correo && Usuarios.Contraseña === Contraseña)
        
        if (verificacionUsuario){
            await AsyncStorage.setItem('Usuario', JSON.stringify(verificacionUsuario));
            navgation.navigate('Inicio');
        } else if (Correo === '' || Contraseña === '') {
            alert('Por favor llene todos los campos')
        } else if (Correo !== dato.Correo || Contraseña !== dato.Contraseña){
            alert('Usuario o contraseña incorrectos')
        }
    }

    return (
      <View style={styles.body}>
        <View style={styles.container}>
            <Text style={styles.text}>Iniciar Sesión</Text>
            <TextInput placeholder='Correo' onChangeText={(text) => setCorreo(text)} style={styles.input} value={Correo}/>
            <TextInput placeholder='Contraseña' onChangeText={(text) => setContraseña(text)} style={styles.input} Value={Contraseña} secureTextEntry/>
            <TouchableOpacity style={styles.button} onPress={ValidarUsuario}><Text>Ingresar</Text></TouchableOpacity>
            <Text style={styles.textR}>¿No tienes cuenta?</Text>
            <TouchableOpacity onPress={() => navgation.navigate('Register')} style={styles.buttonR}>
              <Text style={{ color: '#fff' }}>Registrarse</Text>
            </TouchableOpacity>
        </View>
        
      </View>
    )
  }

  const styles = StyleSheet.create({
    body:{
        backgroundColor: '#E6E100',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container:{
        backgroundColor: '#E58F00',
        width: 310,
        height: 310,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textR:{
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
    },
    input:{
        width: 260,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 5,
    },
    button:{
        width: 235,
        height: 40,
        backgroundColor: '#E6E100',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonR:{
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
    }
  });

