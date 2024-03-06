import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./styles/administrarGrupos.css"; 

const columns = [
  {
    field: "name",
    headerName: "Grupos",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "zone",
    headerName: "Zonas",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "maxMembers",
    headerName: "Número de integrantes",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "coordinator",
    headerName: "Coordinador",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "members",
    headerName: "Teléfono",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
];

export default function DataGridGrupos({ onRowSelection }) {
  const [grupos, setGrupos] = useState([]);

  const handleRowSelection = (row) => {
    console.log("Fila seleccionada:", row);
    onRowSelection(row); // Enviamos la fila seleccionada al componente padre
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/group/")
      .then((response) => {
        console.log(response);
        setGrupos(response.data.map((grupo) => ({ ...grupo, id: grupo._id })));
      })
      .catch((error) => {
        console.error("Error fetching grupos:", error);
      });
  }, []);
  
  return (
    <Box sx={{ width: "auto" }}>
      <div className="datagrid-container" style={{ height: 300 }}>
        <DataGrid
          rows={grupos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoPageSize={false}
          onRowSelectionModelChange={handleRowSelection}
          className="datagrid"
        />
      </div>
    </Box>
  );
}
