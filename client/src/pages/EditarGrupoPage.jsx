import React from 'react';
import ContenedorGeneral from '../components/ContenedorGeneral';
import EditarGrupo from '../components/EditarGrupo';

function EditarGrupoPage() {
  return (
    <div>
        <ContenedorGeneral titulo="Editar Grupo" contenedor={<EditarGrupo/>}/>
    </div>
  )
}

export default EditarGrupoPage