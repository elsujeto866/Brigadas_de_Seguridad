import React from 'react';
import ContenedorGeneral from '../components/ContenedorGeneral';
import FormatoAdministrarGrupos from '../components/FormatoAdministrarGrupos';

function AdministrarGruposPage() {
  return (
    <div>
        <ContenedorGeneral titulo="Administrar Grupo" contenedor={<FormatoAdministrarGrupos/>}/>
    </div>
  )
}

export default AdministrarGruposPage
