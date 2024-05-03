// ClientList.js

import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Fab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import baseUri from "../../services/api.ts";
import AppBar from "../../components/AppBar.tsx";



type Clientes = {

    id: string,
    nome: string,
    cnpj: string,
}


const ClientList = () => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [clientes, setClientes] = useState<Clientes[]>([]);

    useEffect(() => {
        GetAllClients();
    }, [clientes]);

    function GetAllClients (){

        fetch(`${baseUri}clientes`)
            .then((response) => response.json())
            .then((json) => {
                setClientes(json)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function DeleteClient (clientId: string) {

        fetch(`${baseUri}clientes/${clientId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())

            .catch((error) => {
                console.error(error);
            });
    }

    const handleDeleteClick = (clientId : string) => {
        setSelectedClientId(clientId);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirmed = () => {
        DeleteClient(selectedClientId)
        console.log('Cliente deletado:', selectedClientId);
        setOpenDeleteDialog(false);
    };

    const handleDeleteCanceled = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <div>
            <AppBar />
            <h1>Lista de Clientes</h1>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Fab component={Link} to="/add" color="primary">
                        <AddIcon/>
                    </Fab>
                </Grid>
                <Grid item xs={12} mt={2}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>CNPJ</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientes.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>{client.id}</TableCell>
                                        <TableCell>{client.nome}</TableCell>
                                        <TableCell>{client.cnpj}</TableCell>
                                        <TableCell>
                                            <IconButton component={Link} to={`/edit/${client.id}`} color="primary">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleDeleteClick(client.id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={openDeleteDialog} onClose={handleDeleteCanceled}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    Tem certeza de que deseja excluir este cliente?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCanceled} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirmed} color="secondary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ClientList;
