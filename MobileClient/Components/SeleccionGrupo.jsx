import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { CheckBox } from "react-native-elements";
//import { CheckBox } from 'react-native-elements';

const SeleccionGrupos = () => {
  const route = useRoute();
  const { ubicacion, coordenadas, userId } = route.params;
  const ZoneAux = coordenadas.latitude + ", " + coordenadas.longitude;
  const [grupos, setGrupos] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [brigadistas, setBrigadistas] = useState([]); // Lista completa de brigadistas
  const [selected, setSelected] = useState(null); // Grupo seleccionado

  const [memberID1, setMemberID1] = useState(userId);
  // Datos de ejemplo para la tabla de grupos
  const obtenerGrupos = async () => {
    try {
      const response = await axios.get(
        `http://192.168.200.5:8000/api/group/zone/${ZoneAux}`
      ); //ip de mi casa
      setGrupos(response.data);
      //console.log(grupos);
    } catch (error) {
      console.error("Error al obtener los grupos:", error);
      Alert.alert("Error", "No se pudieron obtener los grupos");
    }
  };

  // Obtener la lista completa de brigadistas
  const obtenerBrigadistas = async () => {
    try {
      const response = await axios.get(
        "http://192.168.200.5:8000/api/brigadista/all"
      );
      setBrigadistas(response.data);
    } catch (error) {
      console.error("Error al obtener los brigadistas:", error);
      Alert.alert("Error", "No se pudieron obtener los brigadistas");
    }
  };

  useEffect(() => {
    obtenerGrupos();
    obtenerBrigadistas();
  }, [coordenadas]);

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  // Función para unirse a los grupos seleccionados
  const unirseAGrupo = async () => {
    try {
      const memberID = memberID1; // Reemplaza 'ID_DEL_BRIGADISTA' con el ID del miembro
      await axios.put(
        `http://192.168.200.5:8000/api/group/brigadista/${selectedGroup._id}`,
        { members: memberID }
      );
      Alert.alert("Éxito", "Te has unido al grupo seleccionado correctamente");
      // Después de unirse al grupo, actualiza la lista de brigadistas
      console.log(memberID1);
      obtenerGrupos();
    } catch (error) {
      console.error("Error al unirse al grupo:", error);
      Alert.alert("Error", "No se pudo unir al grupo seleccionado");
    }
  };

  return (
    <View style={styles.container}>
      {/* Botones de los días de la semana */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lunes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Martes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Miércoles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Jueves</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Viernes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sábado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Domingo</Text>
        </TouchableOpacity>
      </View>

      {/* Título "Selecciona Grupo" */}
      <Text style={styles.title}>Selecciona Grupo</Text>

      {/* Tabla de grupos */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Seleccionar</Text>
          <Text style={styles.tableHeader}>Fecha</Text>
          <Text style={styles.tableHeader}>Hora</Text>
          <Text style={styles.tableHeader}>Integrantes</Text>
        </View>
        {grupos.map((grupo, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleGroupSelection(grupo)}
            style={styles.tableRow}
          >
            <CheckBox
              checked={selectedGroup && selectedGroup._id === grupo._id}
              onPress={() => handleGroupSelection(grupo)}
            />
            <Text style={styles.tableData}>{grupo.date}</Text>
            <Text style={styles.tableData}>{grupo.schedule}</Text>
            <Text style={styles.tableData}>{grupo.maxMembers}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Label de ubicación y punto */}
      <View style={styles.locationContainer}>
        <View style={styles.locationPoint} />
        <View style={styles.labelContainer}>
          <Text style={styles.locationLabel}>Ubicación: </Text>
          <Text style={styles.ubicacion}>{ubicacion}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.locationLabel}>Coordenadas: </Text>
          <Text style={styles.coordenadas}>
            {coordenadas.latitude}, {coordenadas.longitude}
          </Text>
        </View>
        
      </View>

      {/* Lista de brigadistas */}
      <View>
        <Text style={styles.title}>Brigadistas:</Text>
        {selectedGroup && selectedGroup.members ? (
          selectedGroup.members.map((brigadistaId, index) => {
            // Buscar el nombre del brigadista en la lista completa
            const brigadista = brigadistas.find((b) => b._id === brigadistaId);
            return (
              <Text key={index}>
                {brigadista
                  ? brigadista.firstName + " " + brigadista.lastName
                  : "Brigadista desconocido"}
              </Text>
            );
          })
        ) : (
          <Text>No se ha seleccionado un grupo</Text>
        )}
      </View>

      {/* Botón Unirse */}
      <TouchableOpacity onPress={unirseAGrupo} style={styles.buttonUnirse}>
        <Text style={styles.buttonText1}>Unirse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  tableData: {
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  locationPoint: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  labelContainer: {
    flexDirection: 'column',
    marginRight: 60,
  },
  buttonUnirse: {
    backgroundColor: "#DAC0A3",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText1: {
    color: "#1C3B6B",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SeleccionGrupos;
