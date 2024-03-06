import React, { useState } from "react";
import BotonGeneral from "./BotonGeneral";
import DataGridGrupos from "./DataGridGrupos";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./styles/administrarGrupos.css"; // Archivo de estilos CSS
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdministrarGrupos() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log("Eliminando grupo: ", selectedGroup);
    if (
      selectedGroup &&
      window.confirm("¿Estás seguro de eliminar este grupo?")
    ) {
      axios
        .delete(
          "http://localhost:8000/api/group/"+ selectedGroup
        )
        .then((response) => {
          console.log(response.data.message);
          setSelectedGroup();
        })
        .catch((error) => {
          console.error("Error eliminando grupo:", error);
        });
    }
  };  

  const handleEdit = () => {
    console.log("Seleccionado: ", selectedGroup);
    if (selectedGroup) {
      const groupId = selectedGroup;
      navigate("/editar-grupo/" + groupId); // Navegar a la ruta de edición con el ID seleccionado
      console.log("ID: ", selectedGroup);
    } else {
      console.error("No se pudo obtener el ID del grupo seleccionado.");
    }
  };
  

  return (
    <div className="contenedor-app">
      {" "}
      {/* Contenedor principal con estilos de fondo */}
      <div className="contenedor-contenido">
        {" "}
        {/* Contenedor de contenido */}
        <Box
          className="contenedor-texto"
          component="form"
          sx={{
            "& > :not(style)": { m: 0, width: "135ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Grupo" variant="outlined" />
        </Box>
        <div className="contenedor-boton">
          <BotonGeneral texto="Buscar" />
          <Link to="/crear-grupo">
            <BotonGeneral texto="Nuevo" />
          </Link>
        </div>
        <div className="contenedor-datagrid">
          <DataGridGrupos
            onRowSelection={(selectedRow) => setSelectedGroup(selectedRow)}
          />
        </div>
        <div className="boton-container">
          <BotonGeneral texto="Editar" onClick={handleEdit} />
          <BotonGeneral texto="Eliminar" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
