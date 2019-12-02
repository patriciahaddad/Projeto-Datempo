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

            isEdit: true,
            
            successMsg:"",

            fileInput: React.createRef()
        }
    }

    componentDidMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        api.get('/usuario/'+ this.state.usuario.IdUsuario ).then(response => {
            if (response.status === 200) {
                this.setState({ usuario: response.data })
            }
        })
    }

    // alterarStateUsuario = (event) => {
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

    // updateUsuario = event =>{
    //     event.preventDefault();
    //     const { senha, email } = this.state.usuario;
        
    //         api.put('/usuario/1', { 
    //             senha: senha,
    //             email: email
    //         }).then(response => {
    //             if(response.status === 200) {
    //                 console.log('Deu certo');
    //             }else {
    //                 console.log('Deu ERRADO');
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         })
        
    // }

    updateUsuario = (event) =>{
        event.preventDefault();
        let usuario = new FormData();
        
        let usuario_alterado = this.state.usuario;


            api.put('/usuario/1' , usuario_alterado)
            
            .then(() => {
                this.setState({successMsg : "Evento alterado com sucesso!"});
            })
            .catch(error => {
                console.log(error);
            })

            .then(
                console.log(usuario_alterado),
                console.log(this.state.updateUsuario)
            )
            
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
                                    <input
                                        type="file"
                                        placeholder="coloque uma foto sua"
                                        aria-label="Coloque uma foto"
                                        name="imgusuario"
                                        value={this.state.usuario.imgusuario}
                                        ref={this.state.fileInput}></input>
                                </div>
                                <div className="form_perfil">
                                    <form onSubmit={this.updateUsuario} id="form_perfil">

                                        <div>
                                            <label>
                                                Nome completo
                                            <input type="text" 
                                                placeholder="Digite seu nome de usuário..." 
                                                name="nome"
                                                value={this.state.usuario.nome}
                                                onChange={this.alterarStateUsuario}
                                                disabled
                                                />
                                            </label>
                                            <label>
                                                CPF/CNPJ
                                            <input type="text" 
                                                placeholder="Digite seu cpf e cnpj..." 
                                                name="identificador" 
                                                value={this.state.usuario.identificador}
                                                onChange={this.alterarStateUsuario}
                                                disabled
                                                />
                                            </label>
                                            <label>
                                                E-mail
                                            <input type="text" 
                                                placeholder="Digite seu email..." 
                                                name="email" 
                                                value={this.state.usuario.email}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                            <label>
                                                Senha
                                            <input type="text" 
                                                placeholder="Digite sua senha..." 
                                                name="senha" 
                                                value={this.state.usuario.senha}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                        </div>
                            
                                        <label>
                                            <div className="btnperfil">
                                                <button className="btn_perfil" type="button" onClick={this.habilitaInput} >Editar </button>
                                                <button className="btn_perfil" type="submit" >Salvar</button>
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