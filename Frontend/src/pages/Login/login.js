import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';

class login extends Component {
    constructor() {
        super();

        this.state = {

            listaUsuario: [],

            postcadastar : {
                nome:"",
                email:"",
                senha:"",
                conf_senha:"",
                identificador:"",
                cep:"",
                tipoUsuaurio:"",
            },

            email: "",
            senha: "",
            erroMensagem : ""
        }
    }


    // componentDidMount(){
    //     this.getUsuario();
    // }

    getUsuario = () =>{
        api.get('/login')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaUsuario : response.data})
                console.log(response)
            }
        })
    }
    
    
    postSetState = (input) =>{
        this.setState({
            postcadastar : {
                ...this.state.postcadastar, [input.target.name] : input.target.value
            }
        })
    }

    postcadastar = (e) =>{

        e.preventDefault();
        
        if(this.state.postcadastar.identificador === 11){
            this.state.postcadastar.tipoUsuaurio = 3
        }else if(this.state.postcadastar.identificador === 14){
            this.state.postcadastar.tipoUsuaurio = 2
        }
        // if(this.state.postEvento.acessoLivre === "0"){ 
        //     this.state.postEvento.acessoLivre = false 
        // }else{
        //     this.state.postEvento.acessoLivre = true
        // }

        api.post('/login', this.state.postcadastar)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Não foi possível cadastrar evento" });
        })

        setTimeout(() => {
            this.getEventos();
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
                                <form method="POST" id="form_login">
                                    <h2>Login</h2>
                                    <label>
                                        Usuário
                                        <input type="text"
                                            placeholder="Digite seu nome de usuário..."
                                            name="usuario"
                                            aria-label="Digitar seu nome de usúario"
                                            required />
                                    </label>
                                    <label>
                                        Senha
                                        <input type="password"
                                            placeholder="Digite sua senha..."
                                            name="senha"
                                            aria-label="Digitar sua senha"
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
                                <form onSubmit="postCadastrar" id="form_cadastro">
                                    <h2>Cadastrar</h2>
                                    <label>
                                        Nome completo
                                        <input type="text"
                                            placeholder="Digite seu nome completo..."
                                            name="nome"
                                            aria-label="Digite seu nome completo"
                                            value={this.state.listaUsuario.nome}
                                            required />
                                           
                                    </label>
                                    <label>
                                        E-mail
                                        <input type="email"
                                            placeholder="Digite seu e-mail..."
                                            name="e-mail"
                                            aria-label="Digite seu e-mail"
                                            value={this.state.listaUsuario.email}
                                            required />
                                    </label>
                                    <label>
                                        CPF/CNPJ
                                        <input type="text"
                                            placeholder="Digite seu CPF/CNPJ..."
                                            name="CPF/CNPJ"
                                            aria-label="Digite seu CPF/CNPJ"
                                            value={this.state.listaUsuario.identificador}
                                            required />
                                    </label>
                                    <label>
                                        CEP
                                        <input type="text"
                                            placeholder="Digite seu CEP..."
                                            name="CEP"
                                            aria-label="Digite seu CEP"
                                            value={this.state.listaUsuario.cep}
                                            required />
                                    </label>
                                    <label>
                                        Senha
                                        <input type="password" 
                                            placeholder="Digite sua senha..." 
                                            name="senha"
                                            aria-label="Digite sua senha" 
                                            value={this.state.listaUsuario.senha}
                                            required />
                                    </label>
                                    <label>
                                        <input type="password"
                                            placeholder="Confirme sua senha..." 
                                            name="senha"
                                            aria-label="Confirme sua senha" 
                                            value={this.state.listaUsuario.conf_senha}
                                            required />
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