import * as React from "react";
import DataGridGrupos from "./DataGridGrupos";
import BotonGeneral from "./BotonGeneral";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function AdministrarGrupos() {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 0, width: "120ch"},
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
          margin: 1
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
