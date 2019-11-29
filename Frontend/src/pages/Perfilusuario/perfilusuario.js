import React, { Component } from 'react';
import avatar from '../../assets/imagens/avatar.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';

class Perfilusuario extends Component {
    constructor() {
        super()
        this.state = {
            listaUsuario: [],

            postUsuario: {
                nome: "",
                email: "",
                senha: "",
                identificador: "",
                idTipoUsuario: "",
                imgusuario: "",
            },
            modal: false,

        }
    }

    componentDidMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        api.get('/usuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuario: response.data })
                }
            })
    }

    //#region POSTs
    postSetState = (input) =>{
        this.setState({
            postUsuario : {
                ...this.state.postUsuario, [input.target.name] : input.target.value
            }
        })
    }

    postUsuario = (e) =>{

        e.preventDefault();

        api.post('/usuario', this.state.postUsuario)
        .then(response => {
            console.log(response);
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
                        <div className="cont_branco">
                            <h2>MEU PERFIL</h2>
                            <hr />
                            <div className="container_perfil">
                                <div className="imgperfil">
                                    <img src={avatar} alt="Imagem de perfil do usuário" />
                                </div>
                                <div className="form_perfil">
                                    <form method="POST" id="form_perfil">

                                        {
                                            this.state.listaUsuario.map(function (u) {
                                                return (
                                                    <form>
                                                        <label>
                                                            Nome completo
                                                    <input type="text" placeholder="Digite seu nome de usuário..." name="nome" value={u.nome} />
                                                        </label>
                                                        <label>
                                                            CPF/CNPJ
                                                    <input type="text" placeholder="Digite seu cpf e cnpj..." name="cpf_cnpj" value={u.identificador} />
                                                        </label>
                                                        <label>
                                                            E-mail
                                                    <input type="text" placeholder="Digite seu email..." name="email" value={u.email} />
                                                        </label>
                                                        <label>
                                                            Usuário
                                                    <input type="text" placeholder="Digite seu nome de usuário..." name="usuário" value={u.idTipoUsuario} />
                                                        </label>
                                                        <label>
                                                            Senha
                                                    <input type="text" placeholder="Digite sua senha..." name="senha" value={u.senha} />
                                                        </label>
                                                    </form>
                                                )
                                            })
                                        }
                                        <label>
                                            <div className="btnperfil">
                                                <button className="btn_perfil" type="submit">Editar</button>
                                                <button className="btn_perfil" type="submit">Salvar</button>
                                            </div>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

export default Perfilusuario;