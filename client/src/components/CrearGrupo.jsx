import React, { useState } from 'react'
import imgMapa from '../assets/img/imagen-mapa.png'
import './styles/crearGrupo.css';
import Box from "@mui/material/Box";
 
///
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP
import { useEffect } from 'react';
///
 
function CrearGrupo() {
  /////  
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  //const [fechaActual, setFechaActual] = useState();
  const [horaSeleccionada, setHoraSeleccionada] = useState(''); // este es para el select
 
  useEffect(() => {
    if (fechaSeleccionada) {
      const fechaAuxiliar= dayjs(fechaSeleccionada).toISOString()
      // Realiza la solicitud al servidor para obtener las horas disponibles
      console.log(fechaAuxiliar);
      axios.get(`http://localhost:8000/api/horarios/${fechaAuxiliar}`) // Cambia la URL según tu configuración
        .then(response => {
          const horasDisponibles = response.data.horas;
          setHorasDisponibles(horasDisponibles); // Actualiza el estado con las horas disponibles
          //setFechaActual(response.data.id)
          //console.log(fechaActual)
          console.log(response.data.horas);
        })
        .catch(error => {
          console.error('Error al obtener las horas disponibles:', error);
        });
    }
  }, [fechaSeleccionada]);
 
 
  // Manejador para el cambio de fecha
  const handleFechaChange = (date) => {
    setFechaSeleccionada(date);
  };
  const handleHoraChange = (event) => {
    setHoraSeleccionada(event.target.value);
  };
  ////
 
  const [nombreGrupo, setNombreGrupo] = useState('');
  const handleNombreGrupoChange = (event) => {
    setNombreGrupo(event.target.value);
  };
 
 
   
  return (
    <Box className="formato-crear-grupo-container"> {/* Aplica una clase al contenedor */}
      <p className="label">Nombre de Grupo:</p> {/* Aplica una clase al elemento de texto */}
      <input type="text" value={nombreGrupo} onChange={handleNombreGrupoChange} className="input" /> {/* Aplica una clase al input */}
      <p className="label">Zona:</p> {/* Aplica una clase al elemento de texto */}
      <input type="text" value="" className="input" /> {/* Aplica una clase al input */}
      <img src={imgMapa} alt="Mapa" className="map-image" /> {/* Aplica una clase a la imagen */}
 
 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha de inicio"
          value={fechaSeleccionada}
          onChange={handleFechaChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
           
           
           
           
      <p className="label">Horario:</p>
      <Select
        value={horaSeleccionada}
        onChange={handleHoraChange}
        className="select"
      >
        {horasDisponibles.map((hora, index) => (
          <MenuItem key={index} value={hora}>
          {hora.horaInicio} - {hora.horaFin}
        </MenuItem>
        ))}
      </Select>
 
    </Box>
  )
}
 
export default CrearGrupo