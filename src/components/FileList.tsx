'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { Box, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '2rem',
});

const StyledPaper = styled(Paper)({
    width: '100%',
    maxWidth: '800px',
    padding: '1rem',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    position: 'relative',
});

const UploadButtonContainer = styled(Box)({
    position: 'absolute',
    top: '1rem',
    right: '1rem',
});

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fileName', headerName: 'File name', width: 200 },
    {
        field: 'size',
        headerName: 'Size',
        type: 'number',
        width: 100,
    },
];

const initialRows = [
    { id: 1, fileName: 'Song1.mp3', size: 3500 },
    { id: 2, fileName: 'Song2.mp3', size: 4200 },
    { id: 3, fileName: 'Song3.mp3', size: 3200 },
    { id: 4, fileName: 'Song4.mp3', size: 2800 },
    { id: 5, fileName: 'Song5.mp3', size: 3100 },
];

const FileList: React.FC = () => {
    const router = useRouter();
    const [rows, setRows] = React.useState(initialRows);

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        const file = params.row.fileName;
        router.push(`/player?file=${file}`);
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newRows = Array.from(files).map((file, index) => ({
                id: rows.length + index + 1,
                fileName: file.name,
                size: Math.round(file.size / 1024),
            }));
            setRows((prevRows) => [...prevRows, ...newRows]);
        }
    };

    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <UploadButtonContainer>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        파일 추가
                        <input
                            type="file"
                            hidden
                            multiple
                            onChange={handleUpload}
                        />
                    </Button>
                </UploadButtonContainer>
                <Typography variant="h4" component="h1" gutterBottom>
                    파일 리스트
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        onRowClick={handleRowClick}
                    />
                </div>
            </StyledPaper>
        </StyledContainer>
    );
};

export default FileList;
