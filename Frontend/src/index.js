import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/estilo.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Sobrenos from './pages/Sobrenos/sobrenos';
import Mostruario from './pages/Mostruario/mostruario';

//Realizamos a criação das rotas
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/sobrenos" component={Sobrenos} />
                <Route path="/mostruario" component={Mostruario} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
