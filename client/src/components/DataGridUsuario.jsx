import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "firstName", headerName: "Nombres", flex: 1 },
  { field: "cedula", headerName: "Cédula", flex: 1 },
  { field: "telephone", headerName: "Teléfono", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "rol", headerName: "Rol", flex: 1 },
];

export default function DataGridUsuario({ onRowSelection, integrantes }) {
  const handleRowSelection = (row) => {
    console.log("Fila seleccionada:", row);
    onRowSelection(row); // Enviamos la fila seleccionada al componente padre
  };

  return (
    <Box sx={{ width: "auto" }}>
      <div className="datagrid-container" style={{ height: 300 }}>
        <DataGrid
          rows={integrantes}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          checkboxSelection
          autoPageSize={false}
          onRowSelectionModelChange={handleRowSelection}
          getRowClassName={(params) =>
            params.row.rol === "coordinador" ? "coordinator-row" : ""
          }
        />
      </div>
    </Box>
  );
}
