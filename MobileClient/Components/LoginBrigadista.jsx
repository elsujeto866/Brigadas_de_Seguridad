import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde React Navigation


const LoginBrigadista = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.200.5:8000/api/brigadista/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cedula,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en AsyncStorage u otra ubicación segura
        // Navegar a la pantalla de inicio o a cualquier otra pantalla necesaria
        console.log('Inicio de sesión exitoso:', data);
        navigation.navigate('RegistroBrigadista');
        // Por ejemplo:
        // navigation.navigate('Home');
      } else {
        // Manejar errores de inicio de sesión, mostrar mensaje de error al usuario
        console.error('Error en inicio de sesión:', data.message);
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      // Manejar errores de red u otros errores
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        <Text style={styles.subtitle}>Bienvenido</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cédula</Text>
          <TextInput
            style={styles.input}
            placeholder="Cédula"
            value={cedula}
            onChangeText={setCedula}
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
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegistroBrigadista')}>
          <Text style={styles.registerLink}>¿No tienes una cuenta? Regístrate</Text>
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
  subtitle: {
    fontSize: 18,
    color: 'white',
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
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#1C3B6B',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: 'white',
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DAC0A3',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1C3B6B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    color: '#DAC0A3',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default LoginBrigadista;
