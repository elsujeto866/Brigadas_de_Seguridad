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

function ValidarUsuario() {
  
  const datosUsuarios = [
    { id: 1, nombre: "Mario", cedula: 178929381, telefono: 9897789, email: "copito@gmail.com" },
    { id: 2, nombre: "Copo", cedula: 178929382, telefono: 9897739, email: "copito123@gmail.com" }
  ];

  const handleAceptarUsuario = (id) => {
    // Lógica para aceptar usuario con el ID proporcionado
    console.log(`Usuario aceptado: ${id}`);
  };

  const handleRechazarUsuario = (id) => {
    // Lógica para rechazar usuario con el ID proporcionado
    console.log(`Usuario rechazado: ${id}`);
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
                <TableCell>Cedula</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.cedula}</TableCell>
                  <TableCell>{usuario.telefono}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      
                      <Box sx={{ mt: 1 }}> {/* Agregar margen top */}
                        <BotonGeneral
                          texto="Aceptar Usuario"
                          onClick={() => handleAceptarUsuario(usuario.id)}
                        />
                      </Box>
                      <Box sx={{ mt: 1 }}> {/* Agregar margen top */}
                        <BotonGeneral
                          texto="Rechazar Usuario"
                          onClick={() => handleRechazarUsuario(usuario.id)}
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
