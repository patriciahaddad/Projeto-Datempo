import React, { Component } from 'react';
import avatar from '../../assets/imagens/avatar.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';

class Perfilusuario extends Component {
    constructor() {
        super()
        this.state = {
            listaUsuario: [],

            putUsuario: {
                idUsuario: "",
                nome: "",
                email: "",
                senha: "",
                identificador: "",
                idTipoUsuario: "",
                imgusuario: "",
            },

            successMsg:"",
            erroMsg:""

        }
    }

    componentDidMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        api.get('/usuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuario: response.data })
                }
            })
    }

    //#region POSTs
    putSetState = (input) =>{
        this.setState({
            putUsuario : {
                ...this.state.putUsuario, [input.target.name] : input.target.value
            }
        })
    }

    

    putUsuario = (event) =>{
        
        event.preventDefault();
        let usuario_id = this.state.putUsuario.idUsuario;
        let usuario_alterado = this.state.putUsuario;
        
        api.put('/usuario/'+usuario_id, usuario_alterado)
        .then(() => {
            this.setState({successMsg : "Evento alterado com sucesso!"});
        })
        .catch(error => {
            console.log(error);
            this.setState({erroMsg : "Falha ao alterar o Evento"});
        })
        
        setTimeout(() => {
            this.getUsuario();
        }, 1500);

        setTimeout(() => {
            this.setState({successMsg : ""});
            this.setState({erroMsg : ""});
        }, 3500);
        
    }

    //#endregion

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
                                    <form onSubmit={this.putUsuario} id="form_perfil">

                                        {
                                            this.state.listaUsuario.map(function (u) {
                                                return (
                                                    <div>
                                                        <label>
                                                            Nome completo
                                                        <input type="text" 
                                                            placeholder="Digite seu nome de usuário..." 
                                                            name="nome" 
                                                            value={u.nome}
                                                            />
                                                        </label>
                                                        <label>
                                                            CPF/    CNPJ
                                                        <input type="text" 
                                                            placeholder="Digite seu cpf e cnpj..." 
                                                            name="identificador" 
                                                            value={u.identificador}
                                                             />
                                                        </label>
                                                        <label>
                                                            E-mail
                                                        <input type="text" 
                                                            placeholder="Digite seu email..." 
                                                            name="email" 
                                                            value={u.email} 
                                                             />
                                                        </label>
                                                        <label>
                                                            Senha
                                                        <input type="text" 
                                                            placeholder="Digite sua senha..." 
                                                            name="senha" 
                                                            value={u.senha}
                                                            />
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }

                                            <label>
                                                <div className="btnperfil">
                                                    <button className="btn_perfil" type="submit">Editar </button>
                                                    <button className="btn_perfil" type="submit">Salvar </button>
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