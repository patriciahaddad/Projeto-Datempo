import React, { Component } from 'react';
import avatar from '../../assets/imagens/avatar.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import apiFormData from '../../services/apiFormData';
import { parseJwt } from '../../services/auth';

class Perfilusuario extends Component {
    constructor() {
        super()
        this.state = {
            usuario: [],

            updateUsuario:{
                idUsuario: parseJwt().idUsuario,
                nome:"",
                identificador:"",
                email:"",
                senha:"",
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
        api.get('/usuario/' + parseJwt().id)

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

        let usuario_id = this.state.updateUsuario.parseJwt().id;

        let usuarioFormData = new FormData();

        usuarioFormData.set("idUsuario", this.state.updateUsuario.parseJwt().id);
        usuarioFormData.set("nome", this.state.updateUsuario.nome);
        usuarioFormData.set("identificador", this.state.updateUsuario.identificador);
        usuarioFormData.set('imgusuario', this.state.updateUsuario.imgusuario.current.files[0], this.state.updateUsuario.imgusuario.value);
        usuarioFormData.set("email", this.state.updateUsuario.email);
        usuarioFormData.set("senha", this.state.updateUsuario.senha);

        let usuario_alterado = this.state.usuario;
            apiFormData.put('/usuario/'+ usuario_id , usuario_alterado)
            
            .then(() => {
                
                this.setState({successMsg : "Perfil alterado com sucesso!"});
            })
            .catch(error => {
                console.log(error);
            })

            setTimeout(() => {
                this.getUsuario();
            }, 1500);
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
                                    <img src={"https://localhost:5001/imgPerfil/" + this.state.usuario.imgusuario} alt="Imagem de perfil do usuário" /><br/>
                                </div>
                                <div className="form_perfil">
                                    <form onSubmit={this.updateUsuario} id="form_perfil" key={parseJwt().id}>
                                    <input
                                        type="file"
                                        placeholder="coloque uma foto sua"
                                        aria-label="Coloque uma foto"
                                        name="imgusuario"
                                        onChange={this.alterarStateUsuario}
                                        ref={this.state.fileInput}></input>
                                        <div>
                                            <label>
                                                Nome completo
                                            <input type="text" 
                                                name="nome"
                                                value={this.state.usuario.nome}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                            <label>
                                                CPF/CNPJ
                                            <input type="text"
                                                name="identificador" 
                                                value={this.state.usuario.identificador}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                            <label>
                                                E-mail
                                            <input type="text" 
                                                name="email" 
                                                value={this.state.usuario.email}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                required
                                                />
                                            </label>
                                            <label>
                                                Senha
                                            <input type="text"  
                                                name="senha" 
                                                value={this.state.usuario.senha}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                required
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