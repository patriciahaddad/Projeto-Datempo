import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/pages/Home/App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch ,Redirect} from 'react-router-dom';
import { usuarioAutenticado, parseJwt } from '../src/services/auth';

import Sobrenos from './pages/Sobrenos/sobrenos';
import Ajuda from './pages/Ajuda/ajuda';
import Login from './pages/Login/login';
import Minhasofertas from './pages/Minhasofertas/minhasofertas';
import Perfilusuario from './pages/Perfilusuario/perfilusuario';
import cadastroOferta from './pages/cadastroOferta/cadastrooferta';
import Mostruario from './pages/Mostruario/mostruario';
import Carrinho from './pages/Carrinho/carrinho';
import Perfiladm from './pages/Perfiladm/perfiladm';
import NotFound from './pages/NotFound/notfound';
    
import './assets/css/estilo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import Produto from './pages/Perfiladm/produto';
import Usuario from './pages/Perfiladm/usuario';
import Ofertas from './pages/Perfiladm/ofertas';

import Categoria from './pages/Perfiladm/categoria';

import CadastroOferta_adm from './pages/Perfiladm/cadastrooferta_adm';
import CadastroUsuario_adm from './pages/Perfiladm/cadastrousuario_adm';
import Reservas from './pages/Minhasofertas/reservas';

const PermissaoAdmin = ({ component : Component }) => (
    <Route 
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ pathname : "/login"}}/>
            )
        }
    />
)

const PermissaoFornecedor = ({ component : Component }) => (
    <Route 
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ pathname : "/login"}}/>
            )
        }
        />
        )
        
        const PermissaoConsumidor = ({ component : Component }) => (
            <Route 
            render={props =>
                usuarioAutenticado() && parseJwt().Role === "Consumidor" ? (
                    <Component {...props}/>
                    ) : (
                        <Redirect to={{ pathname : "/login"}}/>
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
                <Route path="/mostruario" component={Mostruario} />
                <Route path="/Login" component={Login} />
                <Route path="/sobrenos" component={Sobrenos} />
                {/* <PermissaoFornecedor path="/minhasofertas" component={Minhasofertas} /> */}
                {/* <PermissaoConsumidor path="/perfilusuario" component={Perfilusuario} /> */}
                <Route path="/perfilusuario" component={Perfilusuario} />
                {/* <PermissaoFornecedor path="/oferta" component={cadastroOferta} /> */}
                <Route path="/oferta" component={cadastroOferta} />
                <Route path="/mostruario" component={Mostruario} />
                <Route path="/minhasofertas" component={Minhasofertas}/>
                <Route path="/reservas" component={Reservas}/>
                <Route path="/oferta" component={cadastroOferta} />
                <Route path="/carrinho" component={Carrinho}/>
                <Route path="/perfiladm" component={Perfiladm} />
                <Route path="/usuario" component={Usuario} />
                <Route path="/ofertas" component={Ofertas} />
                <Route path="/produto" component={Produto} />
                <Route path="/categoria" component={Categoria} />
                <Route path="/cadastrousuario" component={CadastroUsuario_adm} />
                <Route path="/cadastrooferta" component={CadastroOferta_adm} />
                <Route component={NotFound} />
                {/* <PermissaoFornecedor path="/minhasofertas" component={Minhasofertas} />
                <PermissaoConsumidor path="/perfilusuario" component={Perfilusuario} />
                <PermissaoFornecedor path="/oferta" component={cadastroOferta} />
                <PermissaoConsumidor path="/carrinho" component={Carrinho}/>
                <PermissaoAdmin path="/perfiladm" component={Perfiladm} />
                <PermissaoAdmin path="/usuario" component={Usuario} />
                <PermissaoFornecedor path="/ofertas" component={Ofertas} />
                <PermissaoAdmin path="/produto" component={Produto} />
                <PermissaoAdmin path="/cadastrousuario" component={CadastroUsuario_adm} />
                <PermissaoAdmin path="/cadastrooferta" component={CadastroOferta_adm} /> */}
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

serviceWorker.unregister();
