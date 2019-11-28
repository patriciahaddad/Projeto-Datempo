import React, { Component } from 'react';
import Logo from '../../assets/imagens/Logo6.svg';
import Buscar from '../../assets/imagens/magnifying-glass-icon.png';
import { Link, withRouter } from 'react-router-dom';


class Header extends Component {

    render() {
        return (
            <header>
                <div className="container_h">
                    <img className="logo" src={Logo} alt="Logo Datempo" />
                    <nav>
                        <ul className="menu">
                            <li><a href="index.html" title="Home">Home</a></li>
                            <li><a href="sobrenos.html" title="Sobre nós">Sobre nós</a></li>
                            <li><a href="mostruario.html" title="Produtos">Produtos</a></li>
                            <li><a href="login.html" title="Login">Login</a></li>
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