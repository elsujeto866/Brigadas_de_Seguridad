import React from "react";
import BotonGeneral from "./BotonGeneral";
import DataGridGrupos from "./DataGridGrupos";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function AdministrarGrupos() {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 0, width: "135ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Grupo" variant="outlined" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexdirection: "row",
          margin: 1,
        }}
      >
        <BotonGeneral texto="Buscar" />
      </Box>
      <DataGridGrupos />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexdirection: "row",
          margin: 1,
        }}
      >
        <BotonGeneral texto="Nuevo" />
        <BotonGeneral texto="Editar" />
        <BotonGeneral texto="Eliminar" />
      </Box>
    </div>
  );
}
