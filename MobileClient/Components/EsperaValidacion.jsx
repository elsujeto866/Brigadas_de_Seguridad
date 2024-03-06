import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EsperaValidacion = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Espere a ser validado, recibirá una llamada pronto. Si en su siguiente inicio de sesión no puede ingresar, sus datos no han sido verificados y el administrador lo eliminó de la plataforma. Deberá volver a registrarse.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default EsperaValidacion;
