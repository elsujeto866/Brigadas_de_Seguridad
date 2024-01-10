
//import ContenedorGeneral from "./components/ContenedorGeneral";
import AdmistrarGrupos from './components/AdministrarGrupos';
import SignInSide from './components/SignInSide';
import ValidacionUsuarios from './components/ValidacionUsuarios';
import ContenedorGeneral from './components/ContenedorGeneral';



export default function App() {
  return (
    <div>
      {/*<ContenedorGeneral titulo="Crear Grupo"/>*/}
      <ContenedorGeneral titulo='Verificar Usuario' contenido={<ValidacionUsuarios></ValidacionUsuarios>}></ContenedorGeneral>

    </div>
  );
}
