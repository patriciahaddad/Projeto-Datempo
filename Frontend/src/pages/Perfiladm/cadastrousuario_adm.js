import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';

class CadastroUsuario_adm extends Component {
    constructor(props) {
        super(props);

        this.state = {

            listaUsuario: [],

            postcadastar: {
                Nome: "",
                Email: "",
                Senha: "",
                Identificador: "",
                imgusuario:""
            },

            email: "",
            senha: "",
            erroMensagem: "",
            fileInput: React.createRef()

        }
    }

    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
 
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
                        <div className="cont-branco">
                            
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
                                    <label>
                                        <input type="file"
                                            name="imgusuario"
                                            ref={this.state.fileInput}
                                            onChange={this.postSetState}
                                            required 
                                            ></input>
                                    </label>
                                    <label>
                                        <button className="btn_login"
                                            type="submit">Cadastrar
                                        </button>
                                    </label>
                                </form>
                            </div>
                        </div>
                </main>
                <Footer />
            </div>
        );
    }
}
export default CadastroUsuario_adm