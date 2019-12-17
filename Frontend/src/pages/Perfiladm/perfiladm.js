import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from './../../services/api';
import Menuadm from '../../components/menuadm/menuadm.js';
import apiFormData from '../../services/apiFormData';
import { parseJwt } from '../../services/auth';

import {MDBAlert } from 'mdbreact';


class Perfiladm extends Component {

    constructor() {
        super()
        this.state = {

            listaCategorias: [],
            listaOfertas: [],
            listaProdutos: [],
            listaUsuarios: [],

            putUsuario: {
                idUsuario: parseJwt().idUsuario,
                nome: "",
                identificador: "",
                email: "",
                senha: "",
                idTipoUsuario: "",
                imgusuario: React.createRef(),

            },

            isEdit: true,
            erroMsg: "",
            sucessMsg: ""
        }
    }

    habilitaInput = () => {
        this.setState({
            isEdit: false
        })
    }

    componentDidMount() {
        this.getUsuarios();
    }

    //#region GET
    getUsuarios = () => {
        //pegando id do usuario
        api.get('/usuario/' + parseJwt().id)

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
            listaUsuarios: {
                ...this.state.listaUsuarios, [input.target.name]: input.target.value
            }
        })
    }

    putSetStateFile = (input) => {
        this.setState({
            putUsuario: {
                ...this.state.putUsuario, [input.target.name]: input.target.files[0]
            }
        })
    }

    putUsuario = (event) => {
        event.preventDefault();

        let usuario = new FormData();
        usuario.set("idUsuario", this.state.listaUsuarios.idUsuario);
        usuario.set("idTipoUsuario", this.state.listaUsuarios.idTipoUsuario);
        usuario.set("nome", this.state.listaUsuarios.nome);
        usuario.set("identificador", this.state.listaUsuarios.identificador);
        usuario.set("email", this.state.listaUsuarios.email);
        usuario.set("senha", this.state.listaUsuarios.senha);

        usuario.set('imgusuario', this.state.putUsuario.imgusuario.current.files[0], this.state.putUsuario.imgusuario.value);

        // 05 - Não esqueçam de passar o formData
        apiFormData.put('/usuario/' + parseJwt().id, usuario)

            .then(() => {

                this.setState({ successMsg: "Perfil alterado com sucesso!" });
                this.setState({ isEdit: true });
            })
            .catch(error => {
                console.log(error);
            })

        setTimeout(() => {
            this.getUsuarios();
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
                                <Menuadm/>

                                <div className="adm_configs_dir">
                                    <h2>PERFIL ADM</h2>
                                    <hr />
                                    <img src={"http://localhost:5000/imgPerfil/" + this.state.listaUsuarios.imgusuario} alt="Imagem de perfil do usuário" />
                                    <form onSubmit={this.putUsuario}>
                                        <div className="form_perfil">
                                            <label>Selecione uma imagem
                                        <input
                                                    accept="image/*"
                                                    type="file"
                                                    name="imgusuario"
                                                    onChange={this.putSetStateFile}
                                                    ref={this.state.putUsuario.imgusuario}
                                                    required />
                                            </label>
                                            <label>
                                                Nome completo
                                        <input type="text"
                                                    name="nome"
                                                    value={this.state.listaUsuarios.nome}
                                                    onChange={this.putSetState}
                                                    disabled={this.state.isEdit} />
                                            </label>
                                            <label>
                                                Identificador
                                        <input type="text"
                                                    name="identificador"
                                                    value={this.state.listaUsuarios.identificador}
                                                    onChange={this.putSetState}
                                                    disabled={this.state.isEdit} />
                                            </label>
                                            <label>
                                                E-mail
                                        <input type="text"
                                                    name="email"
                                                    onChange={this.putSetState}
                                                    disabled={this.state.isEdit} required />
                                            </label>
                                            <label>
                                                Senha
                                        <input type="password"
                                                    name="senha"
                                                    onChange={this.putSetState}
                                                    disabled={this.state.isEdit} required />
                                            </label>
                                            <label>
                                                <div className="btnperfil">
                                                    <button className="btn_perfil" type="button" onClick={this.habilitaInput} >Editar </button>
                                                    <button className="btn_perfil" type="submit" >Salvar</button>
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
                                                </div>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <Footer></Footer>
            </div >
        );
    }
}

export default Perfiladm;
