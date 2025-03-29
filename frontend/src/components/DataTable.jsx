import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


const paginationModel = { page: 0, pageSize: 25 };

export default function DataTable({data, columns}) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row.id}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnSelector
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

