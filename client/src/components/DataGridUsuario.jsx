import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'nombres', headerName: 'Nombres', flex: 1 },
    { field: 'cedula', headerName: 'Cédula', flex: 1 },
    { field: 'telefono', headerName: 'Teléfono', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
];

const rows = [
  { id: 1, nombres: 'Nombre 1', cedula: '1234567890', telefono: '1111111111', email: 'correo1@example.com' },
  { id: 2, nombres: 'Nombre 2', cedula: '0987654321', telefono: '2222222222', email: 'correo2@example.com' },
  { id: 3, nombres: 'Nombre 3', cedula: '1234566666', telefono: '3333333333', email: 'correo3@example.com' },
  { id: 4, nombres: 'Nombre 4', cedula: '0987655555', telefono: '4444444444', email: 'correo4@example.com' },
];

export default function DataGridUsuario() {
  return (
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={4}
    checkboxSelection
    disableRowSelectionOnClick
    autoHeight
  />
  );
}
