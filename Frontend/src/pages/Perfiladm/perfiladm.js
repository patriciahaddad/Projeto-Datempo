import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import ImagemPerfil from '../../assets/imagens/avatar.png';


class Perfiladm extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <div className="container">
                        <section className="cont_branco">
                            <div className="organizacao_adm">
                                <div className="adm_configs_esq">
                                    <button className="adm_btn_01" type="submit">CATEGORIA</button>
                                    <button className="adm_btn_01" type="submit">OFERTA</button>
                                    <button className="adm_btn_01" type="submit">PRODUTO</button>
                                    <button className="adm_btn_01" type="submit">USUÁRIO</button>
                                </div>

                                <div className="adm_configs_dir">
                                    <h2>PERFIL ADM</h2>
                                    <hr />
                                    <img src={ImagemPerfil} alt="Imagem de perfil do usuário" />
                                    <div className="form_perfil">
                                        <label>
                                            Nome completo
                                <input type="text" placeholder="Digite seu nome de usuário..." name="nome"
                                                aria-label="Nome completo do usuário" required value="Fulano da Silva" />
                                        </label>
                                        <label>
                                            E-mail
                                <input type="text" placeholder="Digite seu email..." name="email"
                                                aria-label="Email do usuário" required value="fulanosilva@gmail.com" />
                                        </label>
                                        <label>
                                            Senha
                                <input type="password" placeholder="Digite sua senha..." name="senha"
                                                aria-label="Digitar sua senha" required value="••••••••••••" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <Footer></Footer>
            </div >
        );
    }
}



export default Perfiladm;
