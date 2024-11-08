import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const StudentTable = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'aluno', headerName: 'Aluno', width: 200 },
        { field: 'responsavel', headerName: 'Responsável', width: 200 },
        { field: 'contato', headerName: 'Contato', width: 150 },
        { field: 'dataNascimento', headerName: 'Data Nasc.', width: 150 },
        { field: 'cpf', headerName: 'CPF', width: 150 },
        {
            field: 'sexo',
            headerName: 'Sexo',
            width: 100,
            renderCell: (params) => (
                params.value === 'F' ? (
                    <FemaleIcon sx={{ color: '#FF69B4' }} />
                ) : (
                    <MaleIcon sx={{ color: '#1E90FF' }} />
                )
            ),
        },
        {
            field: 'acoes',
            headerName: 'Ações',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button color="primary">Editar</Button>
                    <Button color="error">Excluir</Button>
                </div>
            ),
        },
    ];

    const rows = [
        { id: 1, aluno: 'Alice Souza', responsavel: 'Maria Oliveira', contato: '(48) 99555-0118', dataNascimento: '01/01/2020', cpf: '241.504.856-90', sexo: 'F' },
        { id: 2, aluno: 'Gabriel Lima', responsavel: 'Ana Paula Silva', contato: '(48) 99555-0118', dataNascimento: '01/01/2020', cpf: '215.689.284-91', sexo: 'M' },
    ];

    return (
        <div style={{ height: 400, width: '100%', paddingTop: 40}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default StudentTable;