import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import ImagemPerfil from '../../assets/imagens/avatar.png';
import api from './../../services/api';
// import MenuAdm from '../../components/menuadm/menuadm.js';



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
            sucessMsg: ""
        }
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
                                {/* <MenuAdm></MenuAdm> */}

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
                </main>
                <Footer></Footer>
            </div >
        );
    }
}

export default Perfiladm;
