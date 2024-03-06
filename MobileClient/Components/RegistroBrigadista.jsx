import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 

const RegistroBrigadista = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cedula, setCedula] = useState('');

  const navigation = useNavigation(); // Obtiene el objeto de navegación


  const handleRegistro = async() => {
    // Validaciones de los campos
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !telephone.trim() || !cedula.trim()) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }
    
    try {
        const response = await axios.post('http://192.168.200.5:8000/api/brigadista/register', {
          firstName,
          lastName,
          email,
          password,
          telephone,
          cedula
        });
        console.log('Brigadista registrado:', response.data);
        // Aquí podrías mostrar un mensaje de éxito al usuario
        // Limpieza de los campos del formulario después del registro exitoso

        Alert.alert(
            'Registro exitoso',
            '¡El brigadista ha sido registrado correctamente! En un lapso de 30 minutos recibira una llamada para confirmar su identidad',
            [
              { text: 'OK', onPress: () => navigation.navigate('LoginBrigadista') }
            ]
          );

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setTelephone('');
        setCedula('');

      } catch (error) {
        console.error('Error al registrar el brigadista:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Brigadista</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de Teléfono"
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cédula</Text>
          <TextInput
            style={styles.input}
            placeholder="Cédula"
            keyboardType="numeric"
            value={cedula}
            onChangeText={setCedula}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C3B6B',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 20, // Ajuste para los bordes redondeados de los TextInput
    paddingLeft: 10,
    paddingRight: 10,
    color: '#1C3B6B', // Cambio para mejorar la legibilidad
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#DAC0A3', // Color ajustado del botón
    borderRadius: 30, // Bordes más circulares
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1C3B6B',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegistroBrigadista;
