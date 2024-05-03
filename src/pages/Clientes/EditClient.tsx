
import { TextField, Button, Grid } from '@mui/material';
import AppBar from "../../components/AppBar.tsx";

const EditClient = () => {
    return (
        <div>
            <AppBar />
            <h1>Editar Cliente</h1>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CNPJ"
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default EditClient;
