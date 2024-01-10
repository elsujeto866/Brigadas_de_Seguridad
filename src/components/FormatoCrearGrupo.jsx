import React, { useState } from 'react'
import imgMapa from './assets/img/imagen-mapa.jpg'
import './styles/formatoCrearGrupo.css';


function FormatoCrearGrupo() {
    const [nombreGrupo, setNombreGrupo] = useState('');
    
  
    const handleNombreGrupoChange = (event) => {
      setNombreGrupo(event.target.value);
    };
  
    
  return (
    <div className="formato-crear-grupo-container"> {/* Aplica una clase al contenedor */}
      <p className="label">Nombre de Grupo:</p> {/* Aplica una clase al elemento de texto */}
      <input type="text" value={nombreGrupo} onChange={handleNombreGrupoChange} className="input" /> {/* Aplica una clase al input */}
      <p className="label">Zona:</p> {/* Aplica una clase al elemento de texto */}
      <input type="text" value="" className="input" /> {/* Aplica una clase al input */}
      <img src={imgMapa} alt="Mapa" className="map-image" /> {/* Aplica una clase a la imagen */}
    </div>
  )
}

export default FormatoCrearGrupo