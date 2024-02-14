import React from 'react';
import ContenedorGeneral from '../components/ContenedorGeneral';
import CrearHorarios from '../components/CrearHorarios';

function CrearHorariosPage() {
  return (
    <div>
        <ContenedorGeneral titulo="Crear Horarios" contenedor={<CrearHorarios/>}/>
    </div>
  )
}

export default CrearHorariosPage