import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


class Sobrenos extends Component {

    render() {

        return (
            <div>
                <Header></Header>
                <main>
                    <section className="sn_topo">
                        <div className="sn_texto">
                            <h2>SOBRE NÓS</h2>
                            <hr/> 
                            <p>O projeto Datempo foi criado durante o Code XP 2019 no Senai, em uma parceria com a empresa Linx,
                                com o intuito de gerar um impacto social. O marketplace funciona como um agente de solução, conectando empresas e clientes, com a finalidade de diminuir o desperdício, reduzir gastos e
                                ajudar pessoas. Você encontrará em nossa plataforma ofertas de produtos como: alimentos que estão perto do vencimento e vestimentas que possuem pouca circulação no estoque.<br/>
                                Nunca é tarde, sempre DATEMPO!</p>
                        </div>
                    </section>
                    <section className="sn_dev">
                        <div className="dev">
                            <img src="Imagens/bruna.jpg" alt="foto de perfil da desenvolvedora Bruna Ribeiro" />
                            <p>Bruna Ribeiro<br/>Desenvolvedora Back-end</p>
                        </div>
                        <div className="dev">
                            <img src="Imagens/lucas.jpg" alt="foto de perfil do desenvolvedor Lucas Gregorio" />
                            <p>Lucas Gregorio <br/>Desenvolvedor Front-end</p>
                        </div>
                        <div className="dev">
                            <img src="Imagens/nilson.jpg" alt="foto de perfil do desenvolvedor Nilson Ledres" />
                            <p>Nilson Ledres<br/>Designer</p>
                        </div>
                        <div className="dev">
                            <img src="Imagens/paty.jpg" alt="foto de perfil da desenvolvedora Patrícia Haddad" />
                            <p>Patrícia Haddad<br/>Desenvolvedora Front-end</p>
                        </div>
                        <div className="dev">
                            <img src="Imagens/rubao.jpg" alt="foto de perfil do desenvolvedor Ruben de Castro" />
                            <p>Ruben de Castro<br/>Desenvolvedor Back-end</p>
                        </div>
                        <div className="dev">
                            <img src="Imagens/yasmin.jpg" alt="foto de perfil do desenvolvedora Yasmin Ribeiro" />
                            <p>Yasmin Ribeiro<br/>Desenvolvedora Front-end</p>
                        </div>
                    </section>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

export default Sobrenos;