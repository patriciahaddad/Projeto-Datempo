import React, { Component } from 'react';
import Logo from '../../assets/imagens/Logo6.svg';
import Buscar from '../../assets/imagens/magnifying-glass-icon.png';
import config from '../../assets/imagens/config-icon.png'
import carrinho from '../../assets/imagens/shopping-cart.png'
import Logout from '../../assets/imagens/logout.png'
import { Link, withRouter } from 'react-router-dom';
import './../../assets/css/header.css';
import api from '../../services/api';
import { usuarioAutenticado, parseJwt } from '../../services/auth';

import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

            listaFiltrada: [],
            busca: ""
        }
    }
    // getOferta = () => {
    //     api.get('/oferta')
    //         .then(response => {
    //             if (response.status === 200) {
    //                 this.setState({ listaOferta: response.data });
    //             }
    //         })
    // }
    getFiltroBusca = () => {
        api.get('filtro/filtrarPalavra/' + this.state.busca)
            .then(response => {
                if (response.status === 200){
                this.setState({ listaFiltrada: response.data });
                console.log(this.state.listaFiltrada);

                this.props.history.push({
                    pathname: "/mostruario",
                    state: {
                        filtroBusca: this.state.listaFiltrada
                    }
                    
                })
            }
            })
    }
    //Função para quando o usuario clicar enter, fazer a busca
    _handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.getFiltroBusca();
        }
    }
    // Atualiza campo da select
    atualizaCampo = (input) => {
        this.setState({
            busca: input.target.value
        }
        )
    }

    logout = () => {
        localStorage.removeItem("usuario-datempo");
        // Redireciona para o endereço '/'
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
                                    <MDBDropdown dropdown className="menu">
                                        <MDBDropdownToggle>
                                            MEU PERFIL
                                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBDropdownItem>
                                                <img src={config} ></img>
                                                <Link to="/perfiladm">Configurações</Link>
                                            </MDBDropdownItem>
                                            <MDBDropdownItem>
                                                <img src={carrinho} />
                                                <Link to="/minhasofertas">Minhas Ofertas</Link>
                                            </MDBDropdownItem>
                                            <MDBDropdownItem>
                                                <img src={carrinho} />
                                                <Link to="/reservas">Reservas</Link>
                                            </MDBDropdownItem>
                                            <MDBDropdownItem>
                                                <img src={Logout} ></img>
                                                <Link to="/Login" onClick={this.logout}>Sair</Link>
                                            </MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </>
                            ) : (
                                    usuarioAutenticado() && parseJwt().Role === "Consumidor" ? (
                                        <>
                                            <MDBDropdown dropdown className="menu">
                                                <MDBDropdownToggle>
                                                    MEU PERFIL
                                                        </MDBDropdownToggle>
                                                        <MDBDropdownMenu basic>
                                                            <MDBDropdownItem>
                                                                <img src={config} ></img>
                                                                <Link to="/perfilusuario">Configurações</Link>
                                                            </MDBDropdownItem>
                                                            <MDBDropdownItem>
                                                                <img src={carrinho} />
                                                                <Link to="/carrinho">Carrinho</Link>
                                                            </MDBDropdownItem>
                                                            <MDBDropdownItem>
                                                                <img src={Logout} ></img>
                                                                <Link to="/Login" onClick={this.logout}>Sair</Link>
                                                            </MDBDropdownItem>
                                                        </MDBDropdownMenu>
                                                    </MDBDropdown>
                                        </>
                                    ) : (
                                            usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                                                <>
                                                    <MDBDropdown dropdown className="menu">
                                                        <MDBDropdownToggle>
                                                            MEU PERFIL
                                                        </MDBDropdownToggle>
                                                        <MDBDropdownMenu basic>
                                                            <MDBDropdownItem>
                                                                <img src={config} ></img>
                                                                <Link to="/perfiladm">Configurações</Link>
                                                            </MDBDropdownItem>
                                                            <MDBDropdownItem>
                                                                <img src={Logout} ></img>
                                                                <Link to="/Login" onClick={this.logout}>Sair</Link>
                                                            </MDBDropdownItem>
                                                        </MDBDropdownMenu>
                                                    </MDBDropdown>
                                                </>
                                            ) : (
                                                    <>
                                                        <a href="/Login">Login</a>
                                                    </>
                                                )
                                        )
                                )}
                        </ul>
                        <form >
                            <div className="pesquisa">
                                <input
                                    type="text"
                                    id="txtbusca"
                                    placeholder="Buscar produtos..."
                                    aria-label="Buscar produtos"
                                    onChange={this.atualizaCampo.bind(this)}
                                    onKeyDown={this._handleKeyDown}
                                />
                                <img
                                    src={Buscar}
                                    id="btnbusca"
                                    alt="Buscar" />
                            </div>
                        </form>
                    </nav>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);