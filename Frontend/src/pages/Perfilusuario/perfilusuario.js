import React, { Component } from 'react';
import avatar from '../../assets/imagens/avatar.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';

class Perfilusuario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: {},

            isEdit: true
        }
    }

    componentDidMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        api.get('/usuario/1').then(response => {
            if (response.status === 200) {
                this.setState({ usuario: response.data })
            }
        })
    }

    // alterarStateUsuario = event => {
    //     const chave = event.target.name;
    //     this.setState({
    //         usuario: {
    //             chave: event.target.value
    //         }
    //     });
    // }
    
    alterarStateUsuario = event => {
        this.setState({
            usuario : {
                ...this.state.usuario, [event.target.name] : event.target.value
            }
        });
    }

    // updateSetState = (input) =>{
    //     this.setState({
    //         updateUsuario : {
    //             ...this.state.updateUsuario, [input.target.name] : input.target.value
    //         }
    //     })
    // }

    updateUsuario = event =>{
        event.preventDefault();
        const { senha, email } = this.state.usuario;

        if(senha.length >0 && email.length >0){
            api.put('/usuario/1', { 
                senha: senha,
                email: email
            }).then(response => {
                if(response.status === 200) {
                    console.log('Deu certo');
                }else {
                    console.log('Deu ERRADO');
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }


    habilitaInput = () => {
        this.setState({
            isEdit: false
        })
    }

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
                                    <form onSubmit={this.updateUsuario} id="form_perfil">

                                        <div>
                                            <label>
                                                Nome completo
                                            <input type="text" 
                                                placeholder="Digite seu nome de usuário..." 
                                                name="Nome" 
                                                value={this.state.usuario.nome}
                                                disabled
                                                />
                                            </label>
                                            <label>
                                                CPF/CNPJ
                                            <input type="text" 
                                                placeholder="Digite seu cpf e cnpj..." 
                                                name="Identificador" 
                                                value={this.state.usuario.identificador}
                                                disabled
                                                />
                                            </label>
                                            <label>
                                                E-mail
                                            <input type="text" 
                                                placeholder="Digite seu email..." 
                                                name="Email" 
                                                value={this.state.usuario.email}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                    />
                                            </label>
                                            <label>
                                                Senha
                                            <input type="text" 
                                                placeholder="Digite sua senha..." 
                                                name="Senha" 
                                                value={this.state.usuario.senha}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                        </div>
                            
                                        <label>
                                            <div className="btnperfil">
                                                <button className="btn_perfil" type="button" onClick={this.habilitaInput} >Editar </button>
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