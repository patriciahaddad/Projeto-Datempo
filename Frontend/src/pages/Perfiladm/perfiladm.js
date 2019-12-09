import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import ImagemPerfil from '../../assets/imagens/avatar.png';
import api from './../../services/api';

import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBAlert,
    MDBNav,
    MDBNavLink,
    MDBCol
} from 'mdbreact';



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
            modal1: false,
            modal2: false,
            modal3: false
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }
    
    habilitaInput = () => {
        this.setState({
            isEdit: false
        })
    }

    componentDidMount() {
        this.getCategorias();
        this.getProdutos();
    }

    openModalCategoria = (c) => {
        this.toggle();

        this.setState({ getCategoria: c });
        console.log("GET", this.state.getCategoria);
    }

    openModalEditarCategoria = (c) => {
        this.toggle();

        this.setState({ putCategoria: c });
        console.log("PUT", this.state.putCategoria);
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

    getProdutos = () => {
        api.get('/produto')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProdutos: response.data })
                }
            })
    }

    getUsuarios = () => {
        api.get('/usuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuarios: response.data })
                }
            })
    }

    //#endregion

    //#region PUT

    putSetState = (input) => {
        this.setState({
            putEvento: {
                ...this.state.putCategoria, [input.target.name]: input.target.value
            }
        })
    }

    putCategoria = (event) => {
        event.preventDefault();
        let categoria_id = this.state.putCategoria.idCategoria;
        let categoria_alterado = this.state.putCategoria;

        api.put('/categoria/' + categoria_id, categoria_alterado)
            .then(() => {
                this.setState({ sucessMsg: "Categoria alterada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar o Categoria!" });
            })

        this.toggle();

        setTimeout(() => {
            this.getEventos();
        }, 1500);
    }

    //#endregion

    //#region POSTs
    postSetState = (input) => {
        this.setState({
            postEvento: {
                ...this.state.postCategoria, [input.target.name]: input.target.value
            }
        })
    }

    postCategoria = (c) => {

        c.preventDefault();

        api.post('/categoria', this.state.postCategoria)
            .then(response => {
                console.log(response);
                this.setState({ sucessMsg: "Categoria cadastrada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível cadastrar categoria!" });
            })

        setTimeout(() => {
            this.getCategorias();
        }, 1500);
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

                                    <MDBCol>
                                        <MDBNav className="flex-column font-weight-bold">
                                            <MDBNavLink active to="#!">Active</MDBNavLink>
                                            <MDBNavLink to="#!">Link</MDBNavLink>
                                            <MDBNavLink to="#!">Link</MDBNavLink>
                                            <MDBNavLink disabled to="#!">Disabled</MDBNavLink>
                                        </MDBNav>
                                    </MDBCol>
                                    {/* <MDBDropdown dropright>
                                        <MDBDropdownToggle caret className="adm_btn_01" color="purple darken-3">
                                            Categoria
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBDropdownItem onClick={this.toggle(2)}>Cadastrar nova</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggle(1)}>Visualizar Categorias</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    <MDBDropdown dropright>
                                        <MDBDropdownToggle caret className="adm_btn_01" color="purple darken-3">
                                            Produto
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBDropdownItem>Cadastrar nova</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggle(3)}>Visualizar Produtos</MDBDropdownItem>
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
                                    </MDBDropdown> */}

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
                            <label>
                                <div className="btnperfil">
                                    <button className="btn_perfil" type="button" onClick={this.habilitaInput} >Editar </button>
                                    <button className="btn_perfil" type="submit" >Salvar</button>
                                </div>
                            </label>
                        </section>
                    </div>

                    {/* Container para visualizar categorias cadastradas */}
                    <MDBContainer>
                        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                            <MDBModalHeader toggle={this.toggle(1)}>Categorias</MDBModalHeader>
                            <MDBModalBody>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#</th>
                                            <th>Categoria</th>
                                            <th>Ações</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            this.state.listaCategorias.map(
                                                function (c) {
                                                    return (
                                                        <tr key={c.idCategoria}>
                                                            <td>{c.idCategoria}</td>
                                                            <td>{c.nomeCategoria}</td>
                                                            <td>
                                                                <MDBBtn color="primary" size="sm" onClick={() => this.openModalEditarCategoria(c)}>
                                                                    Editar
                                                                </MDBBtn>
                                                                <MDBBtn color="danger" size="sm" onClick={() => this.deleteEvento(c.idCategoria)}>
                                                                    Excluir
                                                                </MDBBtn>
                                                            </td>
                                                        </tr>
                                                    )
                                                }.bind(this)
                                            )
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle(1)}>Fechar</MDBBtn>
                                <MDBBtn color="primary">Salvar</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>

                    {/* Container para visualizar produtos cadastrados */}
                    <MDBContainer>
                        <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} centered>
                            <MDBModalHeader toggle={this.toggle(3)}>Categorias</MDBModalHeader>
                            <MDBModalBody>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#</th>
                                            <th>Produtos</th>
                                            <th>Categoria</th>
                                            <th>Ações</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            this.state.listaProdutos.map(
                                                function (p) {
                                                    return (
                                                        <tr key={p.idProduto}>
                                                            <td>{p.idProduto}</td>
                                                            <td>{p.nomeProduto}</td>
                                                            <td>{p.idCategoriaNavigation.nomeCategoria}</td>
                                                            <td>
                                                                <MDBBtn color="primary" size="sm" onClick={() => this.openModalEditarProduto(p)}>
                                                                    Editar
                                                                </MDBBtn>
                                                                <MDBBtn color="danger" size="sm" onClick={() => this.deleteEvento(p.idEvento)}>
                                                                    Excluir
                                                                </MDBBtn>
                                                            </td>
                                                        </tr>
                                                    )
                                                }.bind(this)
                                            )
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle(3)}>Fechar</MDBBtn>
                                <MDBBtn color="primary">Salvar</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>

                    {/* Container para cadastrar categorias */}
                    <MDBContainer>
                        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} centered>
                            <MDBModalHeader toggle={this.toggle(2)}>Cadastrar Categoria</MDBModalHeader>
                            <MDBModalBody>
                                <form onSubmit={this.postCategoria}>
                                    <div className="form-group">
                                        <label htmlFor="example2">Nome da Categoria:</label>
                                        <input type="text"
                                            className="form-control form-control-md"
                                            value={this.state.listaCategorias.nomeCategoria}
                                            onChange={this.postSetState} />
                                    </div>
                                    <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                    {
                                        this.state.erroMsg &&
                                        <MDBAlert color="danger" >
                                            {this.state.erroMsg}
                                        </MDBAlert>
                                    }
                                    {
                                        this.state.sucessMsg &&
                                        <MDBAlert color="sucess" >
                                            {this.state.sucessMsg}
                                        </MDBAlert>
                                    }
                                </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle(2)}>Fechar</MDBBtn>
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
