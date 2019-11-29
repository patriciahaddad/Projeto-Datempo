import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import ImagemPerfil from '../../assets/imagens/avatar.png';
import api from './../../services/api';

import { MDBContainer, 
         MDBBtn, 
         MDBModal, 
         MDBModalBody, 
         MDBModalHeader, 
         MDBModalFooter, 
         MDBDropdown, 
         MDBDropdownToggle, 
         MDBDropdownMenu, 
         MDBDropdownItem } from 'mdbreact';



class Perfiladm extends Component {

    constructor() {
        super()
        this.state = {

            listaCategorias: [],
            listaOfertas: [],
            listaProdutos: [],
            listaUsuarios: [],

            postCategoria: {
                nomeCategoria: "",
            },

            postProduto: {
                nomeProduto: "",
                idCategoria: "",
            },

            putCategoria: {
                idCategoria: "",
                nomeCategoria: "",
            },

            putProduto: {
                idProduto: "",
                nomeProduto: "",
                idCategoria: "",
            },

            erroMsg: "",
            sucessMsg: "",
            modal14: false
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    openModal = (c) => {
        this.toggle();

        this.setState({ getCategoria: c });
        console.log("GET", this.state.getCategoria);
    }

    //#region GET
    getCategorias = () => {
        api.get('/categoria')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaCategorias: response.data })
                }
            })
    }

    //#endregion

    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <div className="container">
                        <section className="cont_branco">
                            <div className="organizacao_adm">
                                <div className="adm_configs_esq">
                                    <MDBDropdown dropright>
                                        <MDBDropdownToggle caret className="adm_btn_01" color="purple darken-3">
                                            Categoria
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBDropdownItem>Cadastrar nova</MDBDropdownItem>
                                            <MDBDropdownItem>Visualizar Categorias</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    <MDBDropdown dropright>
                                        <MDBDropdownToggle caret className="adm_btn_01" color="purple darken-3">
                                            Produto
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBDropdownItem>Cadastrar nova</MDBDropdownItem>
                                            <MDBDropdownItem>Visualizar Produtos</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    <MDBDropdown dropright>
                                        <MDBDropdownToggle caret className="adm_btn_01" color="purple darken-3">
                                            Oferta
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBDropdownItem>Cadastrar nova</MDBDropdownItem>
                                            <MDBDropdownItem>Visualizar Ofertas</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    <MDBDropdown dropright>
                                        <MDBDropdownToggle caret className="adm_btn_01" color="purple darken-3">
                                            Usuário
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBDropdownItem>Cadastrar novo</MDBDropdownItem>
                                            <MDBDropdownItem>Visualizar Usuários</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                </div>

                                <div className="adm_configs_dir">
                                    <h2>PERFIL ADM</h2>
                                    <hr />
                                    <img src={ImagemPerfil} alt="Imagem de perfil do usuário" />
                                    <div className="form_perfil">
                                        <label>
                                            Nome completo
                                <input type="text" placeholder="Digite seu nome de usuário..." name="nome"
                                                aria-label="Nome completo do usuário" required value="Fulano da Silva" />
                                        </label>
                                        <label>
                                            E-mail
                                <input type="text" placeholder="Digite seu email..." name="email"
                                                aria-label="Email do usuário" required value="fulanosilva@gmail.com" />
                                        </label>
                                        <label>
                                            Senha
                                <input type="password" placeholder="Digite sua senha..." name="senha"
                                                aria-label="Digitar sua senha" required value="••••••••••••" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <MDBContainer>
                        <MDBBtn color="primary" onClick={this.toggle(14)}>Categorias</MDBBtn>
                        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                            <MDBModalHeader toggle={this.toggle(14)}>Categorias</MDBModalHeader>
                            <MDBModalBody>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Categoria</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.listaCategorias.map(
                                                function (c) {
                                                    return (
                                                        <tr key={c.idCategoria}>
                                                            <td>{c.idCategoria}</td>
                                                            <td>{c.nomeCategoria}</td>
                                                            <td>
                                                                <MDBBtn color="primary" size="sm" onClick={() => this.openModal(c)}>
                                                                    <i className="fas fa-edit"></i>
                                                                </MDBBtn>
                                                                <br />
                                                                <MDBBtn color="danger" size="sm" onClick={() => this.deleteEvento(c.idEvento)}>
                                                                    <i className="fas fa-trash"></i>
                                                                </MDBBtn>
                                                            </td>
                                                        </tr>
                                                    )
                                                }.bind(this)
                                            )
                                        }
                                    </tbody>
                                </table>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle(14)}>Fechar</MDBBtn>
                                <MDBBtn color="primary">Salvar</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>
                </main>
                <Footer></Footer>
            </div >
        );
    }
}

export default Perfiladm;
