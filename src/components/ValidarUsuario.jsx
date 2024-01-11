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
    { id: 1, nombre: "Mario", telefono: 9897789, direccion: "Quito" },
  ];
  return (
    <div>
      <Grid sx={{ marginTop: "80px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Dirección</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.telefono}</TableCell>
                  <TableCell>{usuario.direccion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <BotonGeneral texto="Verificar Miembro" />
      </Box>
    </div>
  );
}

export default ValidarUsuario;
