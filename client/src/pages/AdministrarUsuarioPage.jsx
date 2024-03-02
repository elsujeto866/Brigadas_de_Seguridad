import React from 'react';
import ContenedorGeneral from '../components/ContenedorGeneral';
import ValidarUsuario from '../components/ValidarUsuario';

function AdministrarUsuarioPage() {
  return (
    <div>
        <ContenedorGeneral titulo="Administrar Usuario" contenedor={<ValidarUsuario/>}/>
    </div>
  )
}

export default AdministrarUsuarioPage