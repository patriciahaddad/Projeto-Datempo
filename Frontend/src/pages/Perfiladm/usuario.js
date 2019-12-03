import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from './../../services/api';
//import { parseJwt } from '../../services/auth';

import {
    MDBBtn,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBAlert
} from 'mdbreact';



class Usuario extends Component {

    constructor() {
        super()
        this.state = {

            listaUsuarios: [],
            listaTipousuario: [],

            postUsuario: {
                nome: "",
                email: "",
                senha: "",
                identificador: "",
                idTipoUsuario: "",
            },

            putUsuario: {
                idUsuario: "",
                nome: "",
                email: "",
                senha: "",
                identificador: "",
                imgusuario: React.createRef(),
                idTipoUsuario: "",
            },

            email: "",
            senha: "",
            erroMsg: "",
            sucessMsg: "",
            modal1: false,
            modal2: false
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    openModal = (u) => {
        this.toggle();

        this.setState({ putUsuario: u });
        console.log("PUT", this.state.putUsuario);
    }

    componentDidMount() {
        this.getUsuarios();
        this.getTipousuario();
        console.log(this.listaUsuarios);
    }

    //#region GET

    getUsuarios = () => {
        api.get('/usuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuarios: response.data })
                }
            })
    }

    getTipousuario = () => {
        api.get('/tipousuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaTipousuario: response.data })
                }
            })
    }

    //#endregion

    //#region PUT

    putSetState = (input) => {
        this.setState({
            putUsuario: {
                ...this.state.putUsuario, [input.target.name]: input.target.value
            }
        })
    }

    putUsuario = (event) => {
        event.preventDefault();
        let usuario_id = this.state.putUsuario.idUsuario;
        let usuario_alterado = this.state.putUsuario;

        api.put('/usuario/' + usuario_id, usuario_alterado)
            .then(() => {
                this.setState({ sucessMsg: "Usuario alterada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar o Usuario!" });
            })

        this.toggle(2);

        setTimeout(() => {
            this.getUsuarios();
        }, 1500);
    }

    //#endregion

    //#region POSTs
    postSetState = (input) => {
        this.setState({
            postUsuario: {
                ...this.state.postUsuario, [input.target.name]: input.target.value
            }
        })
    }

    postUsuario = (u) => {

        u.preventDefault();
        console.log("Cadastrando");

        api.post('/usuario', this.state.postUsuario)
            .then(response => {
                console.log(response);
                this.setState({ sucessMsg: "Usuário cadastrado com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível cadastrar usuário!" });
            })

        setTimeout(() => {
            this.getUsuarios();
        }, 1500);
    }

    //#endregion

    //#region DELETE

    deleteUsuario = (id) => {

        this.setState({ sucessMsg: " " })

        api.delete('/usuario/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ sucessMsg: "Excluído com sucesso!" })
                    setTimeout(() => {
                        this.getUsuarios();
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
                                            <th>Nome</th>
                                            <th>Imagem</th>
                                            <th>Tipo Usuário</th>
                                            <th>Ações</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            this.state.listaUsuarios.map(
                                                function (u) {
                                                    return (
                                                        <tr key={u.idUsuario}>
                                                            <td>{u.idUsuario}</td>
                                                            <td>{u.nome}</td>
                                                            <td>{u.imgusuario}</td>
                                                            <td>{u.idTipoUsuarioNavigation.titulo}</td>
                                                            <td>
                                                                <MDBBtn color="primary" size="sm" onClick={() => this.openModal(u)}>
                                                                    Editar
                                                                </MDBBtn>
                                                                <MDBBtn color="danger" size="sm" onClick={() => this.deleteUsuario(u.idUsuario)}>
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

                                <MDBContainer>
                                    <MDBBtn onClick={this.toggle(1)}>Cadastrar</MDBBtn>
                                    <form onSubmit={this.postUsuario}>
                                        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg">
                                            <MDBModalHeader toggle={this.toggle(1)}>Cadastrar usuário</MDBModalHeader>
                                            <MDBModalBody>
                                                <div className="adm_configs_dir">
                                                    <div className="form_perfil">
                                                        <label>Nome completo
                                                         <input type="text"
                                                                placeholder=""
                                                                name="nome"
                                                                aria-label="Nome completo do usuário" required
                                                                value={this.state.listaUsuarios.nome}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <label>Identificador
                                                         <input type="text"
                                                                placeholder=""
                                                                name="identificador"
                                                                aria-label="Identificador do usuário" required
                                                                value={this.state.listaUsuarios.identificador}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <label>E-mail
                                                         <input type="text"
                                                                placeholder="Digite seu email..."
                                                                name="email"
                                                                aria-label="Email do usuário" required
                                                                value={this.state.listaUsuarios.email}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <label>Senha
                                                         <input type="password"
                                                                placeholder="Digite sua senha..."
                                                                name="senha"
                                                                aria-label="Digitar sua senha" required
                                                                value={this.state.listaUsuarios.senha}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <select id="option__tipousuario"
                                                            name="idTipoUsuario"
                                                            className="browser-default custom-select"
                                                            value={this.state.listaUsuarios.idTipoUsuario}
                                                            onChange={this.postSetState}>
                                                            <option value="">Escolha uma categoria...</option>
                                                            {
                                                                this.state.listaTipousuario.map(function (u) {
                                                                    return (
                                                                        <option
                                                                            key={u.idTipoUsuario}
                                                                            value={u.idTipoUsuario}> {u.titulo}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                                <MDBBtn color="primary" type="submit">Cadastrar</MDBBtn>
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
                                            </MDBModalFooter>
                                        </MDBModal>
                                    </form>
                                </MDBContainer>

                                <MDBContainer>
                                    <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg">
                                        <form onSubmit={this.putUsuario}>
                                            <MDBModalHeader toggle={this.toggle(2)}>Editar usuário - {this.state.putUsuario.nome} </MDBModalHeader>
                                            <MDBModalBody>
                                                <div className="adm_configs_dir">
                                                    <div className="form_perfil">
                                                        <label>Nome completo
                                                         <input type="text"
                                                                placeholder=""
                                                                name="nome"
                                                                aria-label="Nome completo do usuário" required
                                                                value={this.state.listaUsuarios.nome}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <label>Identificador
                                                         <input type="text"
                                                                placeholder=""
                                                                name="identificador"
                                                                aria-label="Identificador do usuário" required
                                                                value={this.state.listaUsuarios.identificador}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <label>E-mail
                                                         <input type="text"
                                                                placeholder="Digite seu email..."
                                                                name="email"
                                                                aria-label="Email do usuário" required
                                                                value={this.state.listaUsuarios.email}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <label>Senha
                                                         <input type="password"
                                                                placeholder="Digite sua senha..."
                                                                name="senha"
                                                                aria-label="Digitar sua senha" required
                                                                value={this.state.listaUsuarios.senha}
                                                                onChange={this.postSetState} />
                                                        </label>
                                                        <select id="option__tipousuario"
                                                            name="idTipoUsuario"
                                                            className="browser-default custom-select"
                                                            value={this.state.listaUsuarios.idTipoUsuario}
                                                            onChange={this.postSetState}>
                                                            <option value="">Escolha uma categoria...</option>
                                                            {
                                                                this.state.listaTipousuario.map(function (u) {
                                                                    return (
                                                                        <option
                                                                            key={u.idTipoUsuario}
                                                                            value={u.idTipoUsuario}> {u.titulo}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="secondary" onClick={this.toggle(2)}>Fechar</MDBBtn>
                                                <MDBBtn color="primary" type="submit">Cadastrar</MDBBtn>
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
                                            </MDBModalFooter>

                                        </form>
                                    </MDBModal>
                                </MDBContainer>
                            </div>
                        </section>
                    </div>
                </main>
                <Footer></Footer>
            </div >
        );
    }
}

export default Usuario;
