import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import "./styles/crearHorarios.css"

export default function CrearHorarios() {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoHorario = {
        fecha: dayjs(fecha).toISOString(),
        horaInicio: dayjs(horaInicio).format('HH:mm'),
        horaFin: dayjs(horaFin).format('HH:mm')
      };
      await axios.post('http://localhost:8000/api/horarios/new', nuevoHorario);
      console.log('Horario creado exitosamente');
      console.log(nuevoHorario);        
    } catch (error) {
      if (error.res) {
        console.error('Error al crear horario:', error.res.data);
        
      } else {
        console.error('Error al crear horario:', error.message);
      }
    }
  };

  return (
    <div className='contenedor-app'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3} justifyContent="center">

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Selecciona Fecha:</Typography>
          <p></p>
          <DatePicker name='Fecha' value={fecha} onChange={date => setFecha(date)} className='input-hora' />
        </Grid>

        <Grid item container spacing={3}>

          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" align="center">Selecciona Hora de Inicio:</Typography>
            <p></p>
            <TimePicker
              //label="Hora Inicio"
              defaultValue={dayjs('2022-04-17T18:30')}
              value={horaInicio}
              onChange={time => setHoraInicio(time)}
              ampm={false}
              className='input-hora'
            />
            
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" align="center">Selecciona Hora de Fin:</Typography>
            <p></p>
            <TimePicker
              //label="Hora Fin"
              defaultValue={dayjs('2022-04-17T18:30')}
              value={horaFin}
              onChange={time => setHoraFin(time)}
              ampm={false}
              className='input-hora'
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
        </Grid>
      </Grid>
      </form>
    </LocalizationProvider>
    </div>
  );
}
