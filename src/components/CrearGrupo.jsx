import React from 'react'
import ContenedorGeneral from './ContenedorGeneral'
import FormatoCrearGrupo from './FormatoCrearGrupo'

function CrearGrupo() {
  return (
    <div>
        <ContenedorGeneral titulo="Crear Usuario" contenedor={<FormatoCrearGrupo/>}/>
    </div>
  )
}

export default CrearGrupo