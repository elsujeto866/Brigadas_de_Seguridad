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
///
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Button from '@mui/material/Button';
///
 
function CrearGrupo() {
  /////  
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  //const [fechaActual, setFechaActual] = useState();
  const [horaSeleccionada, setHoraSeleccionada] = useState(''); // este es para el select
 
  
  const [numeroIntegrantes, setNumeroIntegrantes] = useState('');
  const [zona, setZona] = useState('');

  ///
  // Ejemplo de puntos estáticos, reemplaza estos con tus datos reales
  const puntos = [
    { id: 1, position: [-0.266902, -78.532530], name: "Punto 1" },
    { id: 2, position: [-0.270406, -78.516898], name: "Punto 2" },
    { id: 3, position: [-0.278087, -78.524310], name: "Punto 3" },
    // Agrega más puntos según sea necesario
  ];
  ///

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

  const handleNumeroIntegrantesChange = (event) => {
    const valor = event.target.value;
    // Permite solo números
    if (!isNaN(valor) && /^\d*$/.test(valor)) {
      setNumeroIntegrantes(valor);
    }
  };

  const handleMarkerClick = (position) => {
    setZona(`${position[0]}, ${position[1]}`);
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/group/new', {
        name: nombreGrupo,
        maxMembers: numeroIntegrantes,
        date: fechaSeleccionada,
        zone: zona,
        schedule: horaSeleccionada // Aquí necesitarás modificar según la estructura de datos de la hora seleccionada
      });
      console.log('Grupo creado:', response.data);
      // Aquí puedes hacer alguna acción adicional después de crear el grupo, como redirigir a otra página o mostrar un mensaje de éxito.
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
    }
  };
 
   
  return (
    <form onSubmit={handleSubmit}>
    <Box className="formato-crear-grupo-container"> {/* Aplica una clase al contenedor */}
      
      <p className="label">Nombre de Grupo:</p> {/* Aplica una clase al elemento de texto */}
      <input type="text" value={nombreGrupo} onChange={handleNombreGrupoChange} className="input" /> {/* Aplica una clase al input */}
      <p className="label">Zona:</p> {/* Aplica una clase al elemento de texto */}
      <TextField
          type="text"
          value={zona}
          disabled
          variant="outlined"
          className="input"
        />

      <MapContainer center={[-0.1807, -78.4678]} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {puntos.map(punto => (
          <Marker 
          key={punto.id} 
          position={punto.position}
          eventHandlers={{
            click: () => {
              handleMarkerClick(punto.position);
            }
          }}
        >
          <Popup>{punto.name}</Popup>
        </Marker>
        ))}
      </MapContainer>

      <p></p>


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

      <p className="label">Número de Integrantes:</p>
        <TextField
          type="text"
          value={numeroIntegrantes}
          onChange={handleNumeroIntegrantesChange}
          variant="outlined"
          className="input"
        />
        <Button type="submit" variant="contained" style={{ marginTop: '20px' }}>
          Guardar
        </Button>

      
 
    </Box>
    </form>
  )
}
 
export default CrearGrupo