import React, { Component } from 'react';
import Logo from '../../assets/imagens/Logo6.svg';
import Buscar from '../../assets/imagens/magnifying-glass-icon.png';
import { Link } from 'react-router-dom';
import './../../assets/css/header.css';

class Header extends Component {

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
                            <Link to="/login">Login</Link>
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