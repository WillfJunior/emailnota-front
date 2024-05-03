
import { TextField, Button, Grid } from '@mui/material';
import baseUri from "../../services/api.ts";
import {ChangeEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';

type Cliente = {
    nome: string,
    cnpj: string,
}

const AddClient = () => {
    const [newClientData, setNewClientData] = useState<Cliente>({
        nome: '',
        cnpj: ''
    });

    const navigate = useNavigate();

    function Add(clientData: Cliente) {
        fetch(`${baseUri}clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha ao adicionar o cliente');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Cliente adicionado:', data);
                // Realize qualquer ação necessária após a adição bem-sucedida
                navigate('/list');
            })
            .catch((error) => {
                console.error('Erro ao adicionar o cliente:', error);
            });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Add(newClientData);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewClientData({ ...newClientData, [name]: value });
    };


    return (
        <div>
            <h1>Adicionar Cliente</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            required
                            name="nome"
                            value={newClientData.nome}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CNPJ"
                            variant="outlined"
                            fullWidth
                            required
                            name="cnpj"
                            value={newClientData.cnpj}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Adicionar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddClient;
