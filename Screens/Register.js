import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, Alert } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register(){
    const [Nombre, setNombre] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const navigation = useNavigation();

    const validarCorreo = (email) => {
        const validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validar.test(email);
      }
    
    const validarContraseña = (password) => {
        const validar = /^[A-Z].*[0-9]$/
        return validar.test(password);
    }

    const handleButtonPress = async()=>{
        if (Nombre === '' || Correo === '' || Contraseña === '') {
            alert('Por favor, complete todos los campos');
        } else if (!validarCorreo(Correo)) {
            alert('Por favor, ingrese un correo electrónico válido');
        } else if (!validarContraseña(Contraseña)) {
            alert('Por favor, ingrese una contraseña válida, iniciando con una letra mayúscula y conteniendo un número');
        } else {
            const DatosUsuario={
                Nombre: Nombre,
                Correo: Correo,
                Contraseña: Contraseña
            }
            const UsuariosExistentes = await AsyncStorage.getItem('DatosUsuarios');
            let Usuarios = UsuariosExistentes ? JSON.parse(UsuariosExistentes) : [];

            Usuarios.push(DatosUsuario);
            await AsyncStorage.setItem('DatosUsuarios', JSON.stringify(Usuarios));
            alert('Usuario registrado con éxito');
            navigation.navigate('Login');
        }
    };
    
    return (
      <View style={styles.body}>
        <View style={styles.container}>
            <Text style={styles.text}>Registrarse</Text>
            <TextInput placeholder='Nombre Completo' onChangeText={(text) => setNombre(text)} value={Nombre} style={styles.input}/>
            <TextInput placeholder='Correo' onChangeText={(text) => setCorreo(text)} value={Correo} style={styles.input}/>
            <TextInput placeholder='Contraseña' onChangeText={(text) => setContraseña(text)} value={Contraseña} style={styles.input}/>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(Nombre, Correo, Contraseña)}><Text>Registrarse</Text></TouchableOpacity>
            <Text style={styles.textR}>¿Ya tienes cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonR}>
              <Text style={{ color: '#fff' }}>Ingresar</Text>
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
        height: 330,
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
        margin: 5,
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
        margin: 10,
        color: '#fff',
    }
  });