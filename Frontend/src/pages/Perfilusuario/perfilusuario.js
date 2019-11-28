import React, { Component } from 'react';
import avatar from '../../assets/imagens/avatar.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


class Perfilusuario extends Component {
    constructor(){
        super()
        this.state = {


        }
    }

    render() {

        return (
            <div>
                <Header></Header>
                <main>
                    <div class="container">
                        <div class="cont_branco">
                            <h2>MEU PERFIL</h2>
                            <hr/>
                            <div class="container_perfil">
                                <div class="imgperfil">
                                    <img src={avatar} alt="Imagem de perfil do usuário" />
                                </div>
                                <div class="form_perfil">
                                    <form method="POST" id="form_perfil">
                                        <label>
                                            Nome completo
                                            <input type="text" placeholder="Digite seu nome de usuário..." name="nome"
                                                aria-label="Nome completo do usuário" required value="Fulano da Silva" />
                                        </label>
                                        <label>
                                            CPF/CNPJ
                                            <input type="text" placeholder="Digite seu cpf e cnpj..." name="cpf_cnpj"
                                                aria-label="CPF/CNPJ do usuário" required value="xxx.xxx.xxx-xx" />
                                        </label>
                                        <label>
                                            E-mail
                                            <input type="text" placeholder="Digite seu email..." name="email"
                                                aria-label="Email do usuário" required value="fulanosilva@gmail.com" />
                                        </label>
                                        <label>
                                            Usuário
                                            <input type="text" placeholder="Digite seu nome de usuário..." name="usuario"
                                                aria-label="Nome de usúario" required value="fulanosilva112" />
                                        </label>
                                        <label>
                                            Senha
                                            <input type="password" placeholder="Digite sua senha..." name="senha"
                                                aria-label="Digitar sua senha" required value="••••••••••••" />
                                        </label>
                                        <label>
                                            <div class="btnperfil">
                                                <button class="btn_perfil" type="submit">Editar</button>

                                                <button class="btn_perfil" type="submit">Salvar</button>
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