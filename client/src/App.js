import CrearGrupoPage from "./pages/CrearGrupoPage";
import SingInSide from "./pages/SignInSide";
import NotFoundPage from "./pages/NotFoundPage";
import AdministrarGruposPage from "./pages/AdministrarGruposPage";
import AdministrarUsuarioPage from "./pages/AdministrarUsuarioPage";
import EditarGrupoPage from "./pages/EditarGrupoPage";

import CrearHorariosPage from "./pages/CrearHorariosPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";

export default function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SingInSide />} />
          <Route
            path="/administrar-grupos"
            element={<AdministrarGruposPage />}
          />
          <Route
            path="/administrar-usuarios"
            element={<AdministrarUsuarioPage />}
          />
          <Route path="/crear-grupo" element={<CrearGrupoPage />} />
          <Route path="/editar-grupo" element={<EditarGrupoPage />} />

          <Route path="/crear-horarios" element={<CrearHorariosPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}
