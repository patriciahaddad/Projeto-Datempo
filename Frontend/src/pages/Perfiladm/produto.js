import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from './../../services/api';

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
    MDBInput
} from 'mdbreact';



class Produto extends Component {

    constructor() {
        super()
        this.state = {

            listaCategorias: [],
            listaProdutos: [],

            postProduto: {
                nomeProduto: "",
                idCategoria: "",
            },

            putProduto: {
                idProduto: "",
                nomeProduto: "",
                idCategoria: "",
            },

            nomeCategoria: "",
            erroMsg: "",
            sucessMsg: "",
            modal: false
        }

        this.postProduto = this.postProduto.bind(this);
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

    openModal = (p) => {
        this.toggle();

        this.setState({ putProduto: p });
        console.log("PUT", this.state.putProduto);
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
    //#endregion

    //#region PUT

    putSetState = (input) => {
        this.setState({
            putProduto: {
                ...this.state.putProduto, [input.target.name]: input.target.value
            }
        })
    }

    putProduto = (event) => {
        event.preventDefault();
        let produto_id = this.state.putProduto.idProduto;
        let produto_alterado = this.state.putProduto;

        api.put('/produto/' + produto_id, produto_alterado)
            .then(() => {
                this.setState({ sucessMsg: "Produto alterado com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar o Produto!" });
            })

        this.toggle();

        setTimeout(() => {
            this.getProdutos();
        }, 1500);
    }

    //#endregion

    //#region POSTs
    postSetState = (input) => {
        this.setState({
            postProduto: {
                ...this.state.postProduto, [input.target.name]: input.target.value
            }
        })
    }

    postProduto = (p) => {

        p.preventDefault();
        console.log("Cadastrando");

        api.post('/produto', this.state.postProduto)
            .then(response => {
                console.log(response);
                this.setState({ sucessMsg: "Categoria cadastrada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível cadastrar categoria!" });
            })

        setTimeout(() => {
            this.getProdutos();
        }, 1500);
    }
    //#endregion

    //#region DELETE

    deleteProduto = (id) => {

        this.setState({ sucessMsg: " " })

        api.delete('/produto/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ sucessMsg: "Excluído com sucesso!" })
                    setTimeout(() => {
                        this.getProdutos();
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
                <Header></Header>
                <main>
                    <div className="container">
                        <section className="cont_branco">
                            <div className="container_tabelas">
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
                                                                <MDBBtn color="primary" size="sm" onClick={() => this.openModal(p)}>
                                                                    Editar
                                                                </MDBBtn>
                                                                <MDBBtn color="danger" size="sm" onClick={() => this.deleteProduto(p.idProduto)}>
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

                                <form onSubmit={this.postProduto}>
                                    <div className="form-group">
                                        <label htmlFor="example2">Nome do Produto:</label>
                                        <input type="text"
                                            className="form-control form-control-md"
                                            name="nomeProduto"
                                            value={this.state.listaProdutos.nomeProduto}
                                            onChange={this.postSetState} />

                                        <select id="option__tipocategoria"
                                            name="idCategoria"
                                            className="browser-default custom-select"
                                            value={this.state.listaProdutos.idCategoria}
                                            onChange={this.postSetState}
                                        >
                                            <option value="">Escolha uma categoria...</option>
                                            {
                                                this.state.listaCategorias.map(function (c) {
                                                    return (
                                                        <option
                                                            key={c.idCategoria}
                                                            value={c.idCategoria}
                                                        >
                                                            {c.nomeCategoria}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
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
                            </div>
                        </section>
                    </div>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                        <form onSubmit={this.putProduto}>
                            <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putProduto.nomeProduto}</MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput label="Categoria" name="nomeProduto" value={this.state.putProduto.nomeProduto} onChange={this.putSetState} />

                                <select id="option__categoria"
                                                            name="idCategoria"
                                                            className="browser-default custom-select"
                                                            value={this.state.putProduto.idCategoria}
                                                            onChange={this.postSetState}>
                                                            <option value="">Escolha uma categoria...</option>
                                                            {
                                                                this.state.listaCategorias.map(function (c) {
                                                                    return (
                                                                        <option
                                                                            key={c.idCategoria}
                                                                            value={c.idCategoria}> {c.nomeCategoria}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
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

export default Produto;
