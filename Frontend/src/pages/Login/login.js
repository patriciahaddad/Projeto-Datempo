import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { parseJwt } from '../../services/auth';
import api from '../../services/api';

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {

            listaUsuario: [],

            postcadastar: {
                nome: "",
                email: "",
                senha: "",
                conf_senha: "",
                identificador: "",
                cep: "",
                imgusuario: "",
                idTipoUsuario: ""
            },

            email: "",
            senha: "",
            erroMensagem: ""
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

                // Caso a requisição retorne um status code 200
                // salva o token no localStorage
                // e define que a requisição terminou

                if (response.status === 200) {
                    localStorage.setItem('usuario-gufos', response.data.token)

                    // Exibe no console somente o token
                    console.log("Meu token é: " + response.data.token)

                    // Define base64 recebendo o payload do token
                    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]

                    // exibe no console o valor de base64
                    console.log(base64)

                    console.log(window.atob(base64))

                    console.log(JSON.parse(window.atob(base64)))

                    console.log(parseJwt().Role)

                    console.log(JSON.parse(window.atob(base64)))

                    // Exibe no console o tipo de usuário logado
                    console.log(parseJwt().Role)

                    if (parseJwt().Role === 'Fornecedor') {
                        console.log(this.props)
                        this.props.history.push('/minhasofertas');
                    }
                    if (parseJwt().Role === 'Administrador') {
                        this.props.history.push('/perfiladm');
                    }
                    if (parseJwt().Role === 'Consumidor') {
                        this.props.history.push('/perfilusuario');
                    }
                }
            })

            .catch(erro => {
                console.log("Erro: ", erro)
                this.setState({ erroMensagem: 'E-mail ou senha inválidos!' })
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

        api.post('/usuario', this.state.postcadastar)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível cadastrar evento" });
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
                                            name="nome"
                                            aria-label="Digite seu nome completo"
                                            value={this.state.listaUsuario.nome}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    <label>
                                        E-mail
                                        <input type="email"
                                            placeholder="Digite seu e-mail..."
                                            name="email"
                                            aria-label="Digite seu e-mail"
                                            value={this.state.listaUsuario.email}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    <label>
                                        CPF/CNPJ
                                        <input type="text"
                                            placeholder="Digite seu CPF/CNPJ..."
                                            name="identificador"
                                            aria-label="Digite seu CPF/CNPJ"
                                            value={this.state.listaUsuario.identificador}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    <label>
                                        CEP
                                        <input type="text"
                                            placeholder="Digite seu CEP..."
                                            name="cep"
                                            aria-label="Digite seu CEP"
                                            value={this.state.listaUsuario.cep}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    <label>
                                        Senha
                                        <input type="password"
                                            placeholder="Digite sua senha..."
                                            name="senha"
                                            aria-label="Digite sua senha"
                                            value={this.state.listaUsuario.senha}
                                            onChange={this.postSetState}
                                            required />
                                    </label>
                                    <label>
                                        {/* <input type="password"
                                            placeholder="Confirme sua senha..." 
                                            name="senha"
                                            aria-label="Confirme sua senha" 
                                            value={this.state.listaUsuario.conf_senha}
                                            onChange={this.postSetState}
                                            required /> */}
                                    </label>
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