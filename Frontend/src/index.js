import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/pages/Home/App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { usuarioAutenticado, parseJwt } from '../src/services/auth';

import Ajuda from './pages/Ajuda/ajuda';
import Login from './pages/Login/login';
import Sobrenos from './pages/Sobrenos/sobrenos';
import Minhasofertas from './pages/MinhasOfertas/minhasofertas';
import Perfilusuario from './pages/Perfilusuario/perfilusuario';
import cadastroOferta from './pages/cadastroOferta/cadastrooferta';
import Mostruario from './pages/Mostruario/mostruario';
import Produto from './pages/Perfiladm/produto';
import Usuario from './pages/Perfiladm/usuario';
import Ofertas from './pages/Perfiladm/ofertas';
import Reservas from './pages/MinhasOfertas/reservas';

import Perfiladm from './pages/Perfiladm/perfiladm';
import NotFound from './pages/NotFound/notfound';
import Categoria from './pages/Perfiladm/categoria';
import CadastroOferta_adm from './pages/Perfiladm/cadastrooferta_adm';
import CadastroUsuario_adm from './pages/Perfiladm/cadastrousuario_adm';

import './assets/css/estilo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
        }
    />
)

const PermissaoFornecedor = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
        }
    />
)

const PermissaoConsumidor = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && (parseJwt().Role === "Consumidor"  || parseJwt().Role === "Fornecedor") ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
        }
    />
)

//Realizamos a criação das rotas
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/ajuda" component={Ajuda} />
                <Route path="/Login" component={Login} />
                <Route path="/sobrenos" component={Sobrenos} />
                <Route path="/mostruario" component={Mostruario} />
                <PermissaoConsumidor path="/perfilusuario" component={Perfilusuario} />
                <PermissaoFornecedor path="/minhasofertas" component={Minhasofertas} />
                <PermissaoFornecedor path="/reservas" component={Reservas} />
                <PermissaoFornecedor path="/ofertas" component={cadastroOferta} />
                <PermissaoAdmin path="/adm/usuario" component={Usuario} />
                <PermissaoAdmin path="/adm/produto" component={Produto} />
                <PermissaoAdmin path="/adm/perfiladm" component={Perfiladm} />
                <PermissaoAdmin path="/adm/categoria" component={Categoria} />
                <PermissaoAdmin path="/adm/cadastrousuario" component={CadastroUsuario_adm} />
                <PermissaoAdmin path="/adm/cadastrooferta" component={CadastroOferta_adm} />
                <PermissaoAdmin path="/adm/ofertas" component={Ofertas} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

serviceWorker.unregister();
