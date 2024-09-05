import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QrScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert('Código QR detectado!', `Tipo: ${type}\nDatos: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  } else if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.body}>
      <Text style={styles.header}>Escanea un código QR</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Escanear otro código QR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E100' 
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#E58F00',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});