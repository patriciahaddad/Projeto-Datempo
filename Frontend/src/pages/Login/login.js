import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { parseJwt } from '../../services/auth';
import api from '../../services/api';
import avatar from '../../assets/imagens/avatar.png';

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {

            listaUsuario: [],

            postcadastar: {
                Nome: "",
                Email: "",
                Senha: "",
                Identificador: "",
                // imgusuario:""
            },

            email: "",
            senha: "",
            erroMensagem: "",
            // fileInput: React.createRef()

        }
    }

    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    realizarLogin = (event) => {
        event.preventDefault();

        // Limpa o conteúdo do state erroMensagem
        this.setState({ erroMensagem: "" });

        api.post("/login", {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(response => {

                if (response.status === 200) {
                    localStorage.setItem('usuario-datempo', response.data.token)

                    if (parseJwt().Role === 'Fornecedor') {
                        console.log(this.props)
                        this.props.history.push('/minhasofertas');
                    }
                    if (parseJwt().Role === 'Administrador') {
                        console.log(this.props)
                        this.props.history.push('/perfiladm');
                    }
                    if (parseJwt().Role === 'Consumidor') {
                        console.log(this.props)
                        this.props.history.push('/perfilusuario');
                    }
                }
            })

            .catch(erro => {
                console.log("Erro: ", erro)
                this.setState({ erroMensagem: 'E-mail e/ou senha inválidos!' })
            })
    }
    // 
    // 
    // 
    getUsuario = () => {
        api.get('/usuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuario: response.data })
                    console.log(response)
                }
            })
    }


    postSetState = (input) => {
        this.setState({
            postcadastar: {
                ...this.state.postcadastar, [input.target.name]: input.target.value
            }
        })
    }

    postcadastar = (e) => {

        e.preventDefault();

        // let usuario = new FormData();

        api.post('/usuario', this.state.postcadastar)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível cadastrar usuario" });
            })

        setTimeout(() => {
            this.getUsuario();
        }, 1500);
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <div className="container">
                        <div className="cont-geral">
                            <div className="login">
                                <form onSubmit={this.realizarLogin} id="form_login">
                                    <h2>Login</h2>
                                    <label>
                                        Usuário
                                        <input type="text"
                                            placeholder="Digite seu nome de usuário..."
                                            name="email" // Deve ser igual ao nome da variável no state para que o atualizaEstado funcione.
                                            aria-label="Digitar seu nome de usúario"
                                            value={this.state.email}
                                            onChange={this.atualizaEstado}
                                            id="login__email"
                                            required />
                                    </label>
                                    <label>
                                        Senha
                                        <input type="password"
                                            placeholder="Digite sua senha..."
                                            name="senha"
                                            aria-label="Digitar sua senha"
                                            value={this.state.senha}
                                            onChange={this.atualizaEstado}
                                            id="login__password"
                                            required />
                                    <p style={{ color : 'red' }}>{this.state.erroMensagem}</p>
                                    </label>
                                    <label>
                                        <button className="btn_login"
                                            type="submit">Entrar
                                        </button>
                                    </label>
                                </form>
                            </div>



                            <div className="cadastrar">
                                <h2>Cadastrar</h2>
                                <form onSubmit={this.postcadastar} id="form_cadastro">
                                    <label>
                                        Nome completo
                                        <input type="text"
                                            placeholder="Digite seu nome completo..."
                                            name="Nome"
                                            aria-label="Digite seu nome completo"
                                            value={this.state.listaUsuario.nome}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    <label>
                                        E-mail
                                        <input type="email"
                                            placeholder="Digite seu e-mail..."
                                            name="Email"
                                            aria-label="Digite seu e-mail"
                                            value={this.state.listaUsuario.email}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    <label>
                                        CPF/CNPJ
                                        <input type="text"
                                            placeholder="Digite seu CPF/CNPJ..."
                                            name="Identificador"
                                            aria-label="Digite seu CPF/CNPJ"
                                            value={this.state.listaUsuario.identificador}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    {/* <label>
                                        CEP
                                        <input type="text"
                                            placeholder="Digite seu CEP..."
                                            name="cep"
                                            aria-label="Digite seu CEP"
                                            value={this.state.listaUsuario.cep}
                                            onChange={this.postSetState}
                                            required />
                                    </label> */}
                                    <label>
                                        Senha
                                        <input type="password"
                                            placeholder="Digite sua senha..."
                                            name="Senha"
                                            aria-label="Digite sua senha"
                                            value={this.state.listaUsuario.senha}
                                            onChange={this.postSetState}
                                            required />
                                            <p style={{ color : 'red' }}>{this.state.erroMensagem}</p>
                                    </label>
                                    {/* <label type="hidden">
                                        <input type="hidden"
                                            name="imgusuario"
                                            ref={avatar}
                                            value={this.state.listaUsuario.senha}
                                            onChange={this.postSetState}
                                            required 
                                            ></input>
                                    </label> */}
                                    <label>
                                        <button className="btn_login"
                                            type="submit">Cadastrar
                                        </button>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
export default login