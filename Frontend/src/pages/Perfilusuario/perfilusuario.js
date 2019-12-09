import React, { Component } from 'react';
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
                nome:"",
                identificador:"",
                email:"",
                senha:"",
                // 01 - Colocamos o createRef
                imgusuario: React.createRef(),
                
            },

            isEdit: true,
            
            successMsg:"",

        }
    }

    componentDidMount() {
        this.getUsuario();
    }

    openDialogEdit = (receita) => {
        this.setState({ 
            openEdit: true,
            updateUsuario: receita
        });
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

     // 02 - Adicionamos um setState específico
     alterarSetStateFile = (input) =>{
        this.setState({
            updateUsuario : {
                ...this.state.updateUsuario, [input.target.name] : input.target.files[0]
            }   
        })
    }


    updateUsuario = (event) =>{
        event.preventDefault();

        let usuario_alterado = this.state.usuario;

        // 03 - Criamos nosso formData
        let usuarioFormData = new FormData();
        usuarioFormData.set("idUsuario", this.state.usuario.idUsuario);
        usuarioFormData.set("nome", this.state.usuario.nome);
        usuarioFormData.set("identificador", this.state.usuario.identificador);
        usuarioFormData.set("email", this.state.usuario.email);
        usuarioFormData.set("senha", this.state.usuario.senha);
        
        // 04 - Nesta parte está o segredo, precisamos de 3 parâmetros
        usuarioFormData.set('imgusuario', this.state.updateUsuario.imgusuario.current.files[0] , this.state.updateUsuario.imgusuario.value);

        // 05 - Não esqueçam de passar o formData
            apiFormData.put('/usuario/'+ parseJwt().id ,usuarioFormData)
            
            .then(() => {
                
                this.setState({successMsg : "Evento alterado com sucesso!"});
            })
            .catch(error => {
                console.log(error);
            })
        }

    habilitaInput = () => {
        this.setState({
            isEdit: false,
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
                                <div className="imgperfil" >

                                    <img src={"http://localhost:5000/imgPerfil/" + this.state.usuario.imgusuario} alt="Imagem de perfil do usuário" />

                                    <input
                                        accept="image/*"
                                        type="file"
                                        name="imgusuario"
                                        onChange={this.alterarSetStateFile}
                                        ref={this.state.updateUsuario.imgusuario} />
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