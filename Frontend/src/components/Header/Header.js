import React, { Component } from 'react';
import Logo from '../../assets/imagens/Logo6.svg';
import Buscar from '../../assets/imagens/magnifying-glass-icon.png';
import { Link, withRouter } from 'react-router-dom';
import {usuarioAutenticado, parseJwt} from '../../services/auth';
import './../../assets/css/header.css';
import api from '../../services/api';


class Header extends Component {
    constructor(){
        super()
        this.state = {

        listaFiltrada: []

        }
    }

    getFiltroBusca = () => {
        api.get('/filtro/filtrarcategoria/' +this.state.setStateBusca)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaFiltrada: response.data });
                }
            })
    }

    atualizaSelect = (value) => {
        this.setState({ setStateBusca: value })
        setTimeout(() => {
            this.getFiltroBusca(this.state.filtro)
        }, 500);
    }

    logout = () =>{
        localStorage.removeItem("usuario-datempo");
        this.props.history.push("/");
    }

    render() {
        return (
            <header>
                <div className="container_h">
                    <img className="logo" src={Logo} alt="Logo Datempo" />
                    <nav>
                        <ul className="menu">
                            <Link to="/">Home</Link>
                            <Link to="/sobrenos">Sobre nós</Link>
                            <Link to="/mostruario">Produtos</Link>
                            {usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                                <>
                                    <a href="/Login"onClick={this.logout}>Sair</a>
                                </>
                            ) : (
                                    usuarioAutenticado() && parseJwt().Role === "Consumidor" ? (
                                        <>
                                            <a href="/Login"onClick={this.logout}>Sair</a>
                                        </>
                                    ) : (
                                            usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                                                <>
                                                    <a href="/Login"onClick={this.logout}>Sair</a>
                                                </>
                                            ) : (
                                                    <>
                                                        <Link to="/login">Login</Link>
                                                    </>
                                                )
                                        )
                                )}
                        </ul>
                        <div className="pesquisa">
                            <input type="text" id="txtbusca" placeholder="Buscar produtos..." aria-label="Buscar produtos" />
                            <img src={Buscar} id="btnbusca" alt="Buscar" />
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
export default Header;