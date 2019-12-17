import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import Menuadm from '../../components/menuadm/menuadm.js';
import api from './../../services/api';
import { Link } from 'react-router-dom';

import {
    MDBBtn,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBAlert,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
} from 'mdbreact';


class Categoria extends Component {

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

            putCategoria: {
                idCategoria: "",
                nomeCategoria: "",
            },

            nomeCategoria: "",
            erroMsg: "",
            sucessMsg: "",
            modal: false
        }

        this.postCategoria = this.postCategoria.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        this.getCategorias();
        this.getProdutos();
    }

    openModal = (c) => {
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
            putCategoria: {
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
            this.getCategorias();
        }, 1500);
    }

    //#endregion

    //#region POSTs
    postSetState = (input) => {
        this.setState({
            postCategoria: {
                ...this.state.postCategoria, [input.target.name]: input.target.value
            }
        })
    }

    postCategoria = (c) => {

        c.preventDefault();
        console.log("Cadastrando");

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

    //#region DELETE

    deleteCategoria = (id) => {

        this.setState({ sucessMsg: " " })

        api.delete('/categoria/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ sucessMsg: "Excluído com sucesso!" })
                    setTimeout(() => {
                        this.getCategorias();
                    }, 1000);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao excluir!" })
            })
    }

    //#endregion


    render() {
        return (
            <div>
                 <Header/>
                <main>
                    <div className="container">
                    <Menuadm/>
                        <section className="cont_branco">
                            <h2>CATEGORIAS CADASTRADAS</h2>
                            <hr />
                            <div className="container_tabelas">
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
                                                                <MDBBtn color="primary" size="sm" onClick={() => this.openModal(c)}>
                                                                    Editar
                                                                </MDBBtn>
                                                                <MDBBtn color="danger" size="sm" onClick={() => this.deleteCategoria(c.idCategoria)}>
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

                                <h2>CADASTRAR CATEGORIA</h2>
                                <hr />

                                <form onSubmit={this.postCategoria}>
                                    <div className="form-group">
                                        <label htmlFor="example2">Nome da Categoria:</label>
                                        <input type="text"
                                            className="form-control form-control-md"
                                            name="nomeCategoria"
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
                                    <MDBBtn color="danger"><Link to="/perfiladm">Voltar</Link></MDBBtn>
                                </form>
                            </div>
                        </section>
                    </div>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                        <form onSubmit={this.putCategoria}>
                            <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putCategoria.nomeCategoria}</MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput label="Categoria" name="nomeCategoria" value={this.state.putCategoria.nomeCategoria} onChange={this.putSetState} />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                            </MDBModalFooter>
                        </form>
                    </MDBModal>
                </main>
                <Footer></Footer>
            </div >
        );
    }
}

export default Categoria;
