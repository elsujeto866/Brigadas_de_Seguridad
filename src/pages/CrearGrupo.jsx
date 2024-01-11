import React from 'react'
import ContenedorGeneral from '../components/ContenedorGeneral'
import FormatoCrearGrupo from '../components/FormatoCrearGrupo'

function CrearGrupo() {
  return (
    <div>
        <ContenedorGeneral titulo="Crear Grupo" contenedor={<FormatoCrearGrupo/>}/>
    </div>
  )
}

export default CrearGrupo