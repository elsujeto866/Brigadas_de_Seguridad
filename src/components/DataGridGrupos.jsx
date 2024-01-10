import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
 { field: 'grupos', headerName: 'Grupos', width: 150 },
 { field: 'zonas', headerName: 'Zonas', width: 150 },
 {
    field: 'numeroDeIntegrantes',
    headerName: 'Número de integrantes',
    width: 150,
 },
 {
    field: 'coordinador',
    headerName: 'Coordinador',
    width: 150,
 },
 {
    field: 'telefono',
    headerName: 'Teléfono',
    width: 150,
 },
];

const rows = [
 { id: 1, grupos: 'Grupo A', zonas: 'Zona 1', numeroDeIntegrantes: '5/5', coordinador: 'Coordinador 1', telefono: '1234567890' },
 { id: 2, grupos: 'Grupo B', zonas: 'Zona 2', numeroDeIntegrantes: '3/5', coordinador: 'Coordinador 2', telefono: '0987654321' },
 { id: 3, grupos: 'Grupo C', zonas: 'Zona 1', numeroDeIntegrantes: '5/5', coordinador: 'Coordinador 3', telefono: '1234566666' },
 { id: 4, grupos: 'Grupo D', zonas: 'Zona 3', numeroDeIntegrantes: '5/5', coordinador: 'Coordinador 4', telefono: '0987655555' },
];

export default function DataGridGrupos() {
 return (
    <Box sx={{ height: 400, width: '85%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
 );
}