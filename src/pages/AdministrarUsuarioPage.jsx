import React from 'react';
import ContenedorGeneral from '../components/ContenedorGeneral';
import FormatoValidarUsuario from '../components/FormatoValidarUsuario';

function AdministrarUsuarioPage() {
  return (
    <div>
        <ContenedorGeneral titulo="Administrar Usuario" contenedor={<FormatoValidarUsuario/>}/>
    </div>
  )
}

export default AdministrarUsuarioPage