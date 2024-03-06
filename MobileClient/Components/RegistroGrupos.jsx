import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const RegistroGrupos = () => {

    const navigation = useNavigation();
  // Datos de ejemplo para los puntos en el mapa
  const puntos = [
    { id: 1, coordinate: { latitude: -0.266902, longitude: -78.532530 }, name: "Punto 1" },
    { id: 2, coordinate: { latitude: -0.270406, longitude: -78.516898 }, name: "Punto 2" },
    { id: 3, coordinate: { latitude: -0.278087, longitude: -78.524310 }, name: "Punto 3" },
    // Agrega más puntos según sea necesario
  ];

  // Función para manejar la selección de un punto
  const handlePointSelection = (punto) => {
    // Navegar a la pantalla SeleccionGrupos y pasar el punto como parámetro
    navigation.navigate('SeleccionGrupo', { ubicacion: punto.name , coordenadas: punto.coordinate});
  };



  return (
    <View style={styles.container}>
      {/* Mapa con los puntos seteados */}
      <MapView style={styles.map} initialRegion={{
        latitude: -0.1807,
        longitude: -78.4678,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}>
        {puntos.map((punto) => (
          <Marker
            key={punto.id}
            coordinate={punto.coordinate}
            title={punto.name}
            onPress={() => handlePointSelection(punto)}
          />
        ))}
      </MapView>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Botón 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Botón 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Botón 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Botón 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Botón 5</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegistroGrupos;
