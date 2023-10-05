import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import baseUri from '../services/api';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';


type Clientes = {

    id: string,
    nome: string,
    cnpj: string,
}

export default function Home() {

    const [clientes, setClientes] = useState<Clientes[]>([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [text, setText] = useState("");
    const [success, setSuccess] = useState(false);
    const [chave, setChave] = useState("");


    useEffect(() => {
        GetAllClients();
    }, []);

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
    
    function handleEmail() {
        console.log(import.meta.env.VITE_SECRET)
        if(chave !== import.meta.env.VITE_SECRET){
            alert('Chave inválida! \n Email Não enviado....');
            setText('');
            setSelectedValue('');
            setChave('');
            return;
        }

        const notas = {
            "clienteId": selectedValue,
            "valor": text,
        }

        
            fetch(`${baseUri}notas`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(notas)
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setSuccess(true);
                setText('');
                setSelectedValue('');
                setChave('');
                
    
            })
            .catch((error) => {
                console.error(error);
            });
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
            
            
            
            
            
        
        
        
    }

    return (
        <>
        <h1>Enviar Email - Emissão de Nota</h1>
        <Stack spacing={5} direction={'column'}>
            
            <TextField
                id="outlined-select-currency"
                select
                label="Selecione o cliente"
                InputLabelProps={{
                    shrink: true,
                }}
                value={selectedValue}
                onChange={(event) => setSelectedValue(event.target.value)}

            >
                {clientes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.nome}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="outlined-number"
                label="Valor da Nota"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={text}
                onChange={(event) => setText(event.target.value)}

            />

            <TextField
                    required
                    id="outlined-required"
                    label="Chave Secreta"
                    type='password'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={chave}
                    onChange={(event) => setChave(event.target.value)}
            />

            <Button variant="contained" color="success" onClick={handleEmail} >
                Enviar
            </Button>

            { success ? <Alert severity="success">Nota enviada com sucesso!</Alert> : <></>}
            
            </Stack>
        </>
    )
}