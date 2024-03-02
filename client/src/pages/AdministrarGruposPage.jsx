import React from 'react';
import ContenedorGeneral from '../components/ContenedorGeneral';
import AdministrarGrupos from '../components/AdministrarGrupos';

function AdministrarGruposPage() {
  return (
    <div>
        <ContenedorGeneral titulo="Administrar Grupo" contenedor={<AdministrarGrupos/>}/>
    </div>
  )
}

export default AdministrarGruposPage
