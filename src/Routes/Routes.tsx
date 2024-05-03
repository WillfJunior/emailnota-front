
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Routes as RoutesRoot } from 'react-router'
import Home from '../pages/Home.tsx';
import ClientList from '../pages/Clientes/ClientList.tsx';
import AddClient from '../pages/Clientes/AddClient.tsx';
import EditClient from '../pages/Clientes/EditClient.tsx';


const Routes = () => {
    return (
        <Router>
            <RoutesRoot>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<ClientList />} />
                <Route path="/add" element={<AddClient />} />
                <Route path="/edit/:id" element={<EditClient />} />
            </RoutesRoot>
        </Router>
    );
};

export default Routes;