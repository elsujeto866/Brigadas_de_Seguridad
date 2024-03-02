import React from 'react'
import ContenedorGeneral from '../components/ContenedorGeneral'
import CrearGrupo from '../components/CrearGrupo'

function CrearGrupoPage() {
  return (
    <div>
        <ContenedorGeneral titulo="Crear Grupo" contenedor={<CrearGrupo/>}/>
    </div>
  )
}

export default CrearGrupoPage