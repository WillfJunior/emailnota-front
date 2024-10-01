import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import baseUri from '../services/api';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import AppBar from "../components/AppBar.tsx";


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
    const [textObservacoes, setTextObservacoes] = useState("");
    const [isSending, setIsSending] = useState(false);



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
        setIsSending(true);
        if(chave !== import.meta.env.VITE_SECRET){
            alert('Chave inválida! \n Email Não enviado....');
            setText('');
            setSelectedValue('');
            setChave('');
            return;
        }

        console.log(isSending)

        const notas = {
            "clienteId": selectedValue,
            "valor": text,
            "observacoes" : textObservacoes,
        }

        
            fetch(`${baseUri}notass`,{
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
                setTextObservacoes('')


            })
            .catch((error) => {
                console.error(error);
            });
            setTimeout(() => {
                setSuccess(false);

            }, 3000);
            setIsSending(false)
        console.log(isSending)
            
            
            
            
        
        
        
    }

    const dataAtual = new Date();

// Obter o mês e ano atuais
const mesAtual = dataAtual.getMonth(); // 0-11 (0 para Janeiro, 11 para Dezembro)
const anoAtual = dataAtual.getFullYear();

// Calcular o mês anterior
let mesAnterior = mesAtual - 1;
let anoAnterior = anoAtual;

// Se o mês atual é janeiro (0), então o mês anterior é dezembro (11) do ano anterior
if (mesAnterior < 0) {
    mesAnterior = 11; // Dezembro
    anoAnterior--; // Reduzir o ano
}

// Formatação do mês anterior para garantir dois dígitos
const mesAnteriorFormatado = String(mesAnterior + 1).padStart(2, '0');

    return (
        <>
            <AppBar />
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
                onChange={(event) => 
                    {
                        
                        setSelectedValue(event.target.value)
                        console.log(selectedValue)
                        if(selectedValue.includes('57ac2a21')){
                            console.log("Teste")
                            setTextObservacoes(`Gestor: Leandro Santana. Squad: GTF-Experiencia do Cliente. NF referente à ${mesAnteriorFormatado}/${anoAnterior} `)
                        }else{
                            setTextObservacoes('')
                        }
                    }}

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
                id="outlined-multiline-static"
                label="Observações"
                multiline
                rows={4}
                InputLabelProps={{
                    shrink: true,
                }}
                value={textObservacoes}
                onChange={(event) => setTextObservacoes(event.target.value)}

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


                <Button  variant="contained" color="success" onClick={handleEmail} >
                    Enviar
                </Button>



            { success ? <Alert severity="success">Nota enviada com sucesso!</Alert> : <></>}
            
            </Stack>
        </>
    )
}