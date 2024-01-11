import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
//Mis componentes
import BotonGeneral from "./BotonGeneral";
import DataGridUsuario from "./DataGridUsuario";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import Grid from "@mui/material/Grid";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function EditarGrupo() {
    return (
    <Box sx={{ display: "flex" }}>           
      <Box component="main" sx={{ flexGrow: 1, p: 4, /*backgroundColor: '#1c3b6b'*/}}>
       
        <Grid container spacing={2} alignItems="center" >
          {/* Nombre */}
          <Grid item xs={12} container alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="filled-basic">Nombre:</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <FilledInput
                id="filled-basic"
                variant="filled"
                disabled
                sx={{ width: "70%", backgroundColor:'white'}}
              />
            </Grid>
          </Grid>

          {/* Zona */}
          <Grid item xs={12} container alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="filled-zone">Zona:</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <FilledInput
                id="filled-zone"
                variant="filled"
                disabled
                sx={{ width: "70%" }}
              />
            </Grid>
          </Grid>

          {/* Día y Horario */}
          <Grid item xs={12} md={4} container alignItems="center">
            <Grid item xs={6}>
              <InputLabel htmlFor="filled-day">Día:</InputLabel>
            </Grid>
            <Grid item xs={6}>
              <FilledInput id="filled-day" variant="filled" disabled />
            </Grid>
          </Grid>

          <Grid item xs={12} md={8} container alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="filled-hour">Horario:</InputLabel>
            </Grid>
            <Grid item xs={6}>
              <FilledInput
                id="filled-hour"
                variant="filled"
                disabled
                sx={{ width: "91%" }}
              />
            </Grid>
          </Grid>
        </Grid>
        
        <Grid container spacing={2} >
          {/* DataGridUsuario */}
          <Grid item xs={10} sx={{ width: "75%" }}>
            <DataGridUsuario style={{ margin: "10px" }} />
          </Grid>

          {/* Botón */}
          <Grid item xs={2}>
            <BotonGeneral texto="Eliminar miembro" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}