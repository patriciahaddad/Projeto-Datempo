import React, { Component } from 'react';
import avatar from '../../assets/imagens/avatar.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import apiFormData from '../../services/apiFormData';
import { parseJwt } from '../../services/auth';

class Perfilusuario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: [],
            updateUsuario:{
                nome:"",
                identificador:"",
                email:"",
                senha:"",
                idUsuario:"",
                imgusuario: React.createRef(),
            },

            isEdit: true,
            
            successMsg:"",

        }
    }

    componentDidMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        //pegando id do usuario
        apiFormData.get('/usuario/' + parseJwt().id)
        .then(response => {
            if (response.status === 200) {
                this.setState({ usuario: response.data })
            }
        })
    }

    alterarStateUsuario = event => {
        this.setState({
            usuario : {
                ...this.state.usuario, [event.target.name] : event.target.value
            }
        });
    }

    updateUsuario = (event) =>{
        event.preventDefault();
        let usuarioFormData = new FormData();
        usuarioFormData.set("email", this.state.usuario.email);
        usuarioFormData.set("senha", this.state.usuario.senha);

        let usuario_alterado = this.state.usuario;
            apiFormData.put('/usuario/'+ parseJwt().id , usuario_alterado)
            
            .then(() => {
                
                this.setState({successMsg : "Evento alterado com sucesso!"});
            })
            .catch(error => {
                console.log(error);
            })
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
                                    {/* <input
                                        type="file"
                                        placeholder="coloque uma foto sua"
                                        aria-label="Coloque uma foto"
                                        name="imgusuario"
                                        value={this.state.usuario.imgusuario}
                                        ref={this.state.fileInput}></input> */}
                                </div>
                                <div className="form_perfil">
                                    <form onSubmit={this.updateUsuario} id="form_perfil">

                                        <div>
                                            <label>
                                                Nome completo
                                            <input type="text" 
                                                name="nome"
                                                value={this.state.usuario.nome}
                                                onChange={this.alterarStateUsuario}
                                                disabled
                                                />
                                            </label>
                                            <label>
                                                CPF/CNPJ
                                            <input type="text"
                                                name="identificador" 
                                                value={this.state.usuario.identificador}
                                                onChange={this.alterarStateUsuario}
                                                disabled
                                                />
                                            </label>
                                            <label>
                                                E-mail
                                            <input type="text" 
                                                name="email" 
                                                value={this.state.usuario.email}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                            <label>
                                                Senha
                                            <input type="text"  
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