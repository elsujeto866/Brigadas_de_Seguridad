import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BotonGeneral from './BotonGeneral';

export default function CrearHorarios() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3} justifyContent="center">

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Selecciona Fecha:</Typography>
          <DatePicker />
        </Grid>

        <Grid item container spacing={3}>

          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" align="center">Selecciona Hora de Inicio:</Typography>
            <TimePicker
              label="Hora Inicio"
              defaultValue={dayjs('2022-04-17T18:30')}
              ampm={false}
            />
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" align="center">Selecciona Hora de Fin:</Typography>
            <TimePicker
              label="Hora Fin"
              defaultValue={dayjs('2022-04-17T18:30')}
              ampm={false}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <BotonGeneral texto="Guardar" />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
