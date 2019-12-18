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
    MDBAlert,
    MDBInput
} from 'mdbreact';
import apiFormData from '../../services/apiFormData.js';



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
                imgusuario: React.createRef(),
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
            modal: false
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    openModal = (u) => {
        this.toggle();

        this.setState({ putUsuario: u }, () => {
            console.log("PUT", this.state.putUsuario);
        });
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

    putSetStateFile = (input) => {
        this.setState({
            putUsuario: {
                ...this.state.putUsuario, [input.target.name]: input.target.files[0]
            }
        })
    }

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

        let usuario = new FormData();
        
        console.log("Imagem Oferta Put: ", this.state.putUsuario.imgusuario);


        usuario.set('idUsuario', this.state.putUsuario.idUsuario);
        usuario.set('nome', this.state.putUsuario.nome);
        usuario.set('email', this.state.putUsuario.email);
        usuario.set('senha', this.state.putUsuario.senha);
        usuario.set('identificador', this.state.putUsuario.identificador);
        usuario.set('imgusuario', this.state.putUsuario.imgusuario.current.files[0], this.state.putUsuario.imgusuario.value);
        usuario.set('idTipoUsuario', this.state.putUsuario.idTipoUsuario);

        apiFormData.put('/usuario/' + usuario_id, usuario)
            .then(() => {
                this.setState({ sucessMsg: "Usuario alterada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar o Usuario!" });
            })

        this.toggle();

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

        this.toggle(1);

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
                                                                <MDBBtn color="terciary" size="sm" onClick={() => this.openModal(u)}>
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
                                {/* MODAL EDITAR */}
                                <MDBContainer>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                                        <form onSubmit={this.putUsuario}>
                                            <MDBModalHeader toggle={this.toggle}>Editar usuário - {this.state.putUsuario.nome} </MDBModalHeader>
                                            <MDBModalBody>
                                                <div className="adm_configs_dir">
                                                    <div className="form_perfil">
                                                        <label>Nome completo
                                                         <MDBInput name="nome"
                                                                aria-label="Nome completo do usuário" required
                                                                value={this.state.putUsuario.nome}
                                                                onChange={this.putSetState} />
                                                        </label>
                                                        <label>Identificador
                                                         <MDBInput name="identificador"
                                                                aria-label="Identificador do usuário" required
                                                                value={this.state.putUsuario.identificador}
                                                                onChange={this.putSetState} />
                                                        </label>
                                                        <label>E-mail
                                                         <MDBInput name="email"
                                                                aria-label="Email do usuário" required
                                                                value={this.state.putUsuario.email}
                                                                onChange={this.putSetState} />
                                                        </label>
                                                        <label>Senha
                                                         <MDBInput name="senha"
                                                                aria-label="Digitar sua senha" required
                                                                value={this.state.putUsuario.senha}
                                                                onChange={this.putSetState} />
                                                        </label>
                                                        <label>Imagem do Usuário
                                                         <input accept="image/*"
                                                                name="imgusuario"
                                                                type="file"
                                                                onChange={this.putSetStateFile}
                                                                ref={this.state.putUsuario.imgusuario} />
                                                        </label>
                                                        <select id="option__tipousuario"
                                                            name="idTipoUsuario"
                                                            className="browser-default custom-select"
                                                            value={this.state.putUsuario.idTipoUsuario}
                                                            onChange={this.putSetState}>
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
                                                <MDBBtn color="terciary" onClick={this.toggle}>Fechar</MDBBtn>
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
