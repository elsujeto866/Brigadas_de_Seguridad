import React from "react";
import BotonGeneral from "./BotonGeneral";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";
import axios from "axios";

function ValidarUsuario() {
  const [brigadistas, setBrigadistas] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP GET para obtener la lista de brigadistas
    axios.get("http://localhost:8000/api/brigadista/all")
      .then((response) => {
        // Filtrar los brigadistas con verificación false
        const brigadistasVerificacionFalse = response.data.filter(
          (brigadista) => brigadista.validation === false
        );
        console.log(brigadistasVerificacionFalse);
        setBrigadistas(brigadistasVerificacionFalse); // Actualizar el estado con los datos de los brigadistas filtrados
      })
      .catch((error) => {
        console.error("Error al obtener la lista de brigadistas:", error);
      });
  }, []); // Ejecutar solo una vez al cargar el componente

  const handleAceptarUsuario = (id) => {
    // Lógica para aceptar usuario con el ID proporcionado
    console.log(`Usuario aceptado: ${id}`);
    // Enviar una solicitud para actualizar el campo 'verificacion' a true
    axios.put(`http://localhost:8000/api/brigadista/${id}`, { validation: true })
      .then(response => {
        console.log('Campo de verificación actualizado correctamente:', response.data);
        // Después de actualizar el campo, actualizamos la lista de brigadistas mostrada en la tabla
        setBrigadistas(brigadistas.filter(brigadista => brigadista._id !== id));
      })
      .catch(error => {
        console.error('Error al actualizar el campo de verificación:', error);
      });
  };

  const handleRechazarUsuario = (id) => {
    // Lógica para rechazar usuario con el ID proporcionado
  console.log(`Usuario rechazado: ${id}`);
  // Enviar una solicitud para eliminar el usuario
  axios.delete(`http://localhost:8000/api/brigadista/${id}`)
    .then(response => {
      console.log('Usuario eliminado correctamente:', response.data);
      // Después de eliminar al usuario, actualizamos la lista de brigadistas mostrada en la tabla
      setBrigadistas(brigadistas.filter(brigadista => brigadista._id !== id));
    })
    .catch(error => {
      console.error('Error al eliminar el usuario:', error);
    });
  };

  return (
    <div>
      <Grid sx={{ marginTop: "80px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Cedula</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brigadistas.map((brigadista) => (
                <TableRow key={brigadista._id}>
                  <TableCell>{brigadista._id}</TableCell>
                  <TableCell>{brigadista.firstName}</TableCell>
                  <TableCell>{brigadista.lastName}</TableCell>
                  <TableCell>{brigadista.cedula}</TableCell>
                  <TableCell>{brigadista.telephone}</TableCell>
                  <TableCell>{brigadista.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box sx={{ mt: 1 }}>
                        {" "}
                        {/* Agregar margen top */}
                        <BotonGeneral
                          texto="Aceptar Usuario"
                          onClick={() => handleAceptarUsuario(brigadista._id)}
                        />
                      </Box>
                      <Box sx={{ mt: 1 }}>
                        {" "}
                        {/* Agregar margen top */}
                        <BotonGeneral
                          texto="Rechazar Usuario"
                          onClick={() => handleRechazarUsuario(brigadista._id)}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default ValidarUsuario;
