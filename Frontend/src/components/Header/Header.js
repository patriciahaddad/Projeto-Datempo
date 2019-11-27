import React, { Component } from 'react';


class Header extends Component {

    render() {
        return (
            <header>
                <div className="container_h">
                    <img className="logo" src="Imagens/Logo6.svg" alt="Logo Datempo" />
                    <nav>
                        <ul className="menu">
                            <li><a href="index.html" title="Home">Home</a></li>
                            <li><a href="sobrenos.html" title="Sobre nós">Sobre nós</a></li>
                            <li><a href="mostruario.html" title="Produtos">Produtos</a></li>
                            <li><a href="login.html" title="Login">Login</a></li>
                        </ul>
                        <div className="pesquisa">
                            <input type="text" id="txtbusca" placeholder="Buscar produtos..." aria-label="Buscar produtos" />
                            <img src="Imagens/magnifying-glass-icon.png" id="btnbusca" alt="Buscar" />
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
export default Header;