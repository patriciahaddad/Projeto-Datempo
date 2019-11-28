import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import gastos from '../../assets/imagens/piggy-bank.png';
import desperdicio from '../../assets/imagens/plant.png';
import pessoas from '../../assets/imagens/hands.png';
import bruna from '../../assets/imagens/bruna.jpg';
import lucas from '../../assets/imagens/lucas.jpg';
import paty from '../../assets/imagens/paty.jpg';
import nilson from '../../assets/imagens/nilson.jpg';
import yasmin from '../../assets/imagens/yasmin.jpg';
import rubao from '../../assets/imagens/rubao.jpg';


class Sobrenos extends Component {

    render() {

        return (
            <div>
                <Header></Header>
                <main>
                    <section className="sn_topo">
                        <div className="sn_texto">
                            <h2>SOBRE NÓS</h2>
                            <hr />
                            <p>O projeto Datempo foi criado durante o Code XP 2019 no Senai, em uma parceria com a empresa Linx,
                                com o intuito de gerar um impacto social. O marketplace funciona como um agente de solução, conectando empresas e clientes, com a finalidade de diminuir o desperdício, reduzir gastos e
                                ajudar pessoas. Você encontrará em nossa plataforma ofertas de produtos como: alimentos que estão perto do vencimento e vestimentas que possuem pouca circulação no estoque.<br />
                                Nunca é tarde, sempre DATEMPO!</p>
                        </div>
                    </section>
                    <section className="objetivos">
                        <h2>OBJETIVOS</h2>
                        <hr />
                        <div className="sn_section2">
                            <div className="quadro1">
                                <img src={gastos} alt="Imagem de um cofrinho representando o ideal de reduzir gastos" />
                                <p>REDUZIR GASTOS</p>
                            </div>
                            <div className="quadro1">
                                <img src={desperdicio} alt="Imagem de duas mãos segurando uma muda de planta para representar a diminuição do desperdício de alimento" />
                                <p>DIMINUIR O DESPERDÍCIO</p>
                            </div>
                            <div className="quadro1">
                                <img src= {pessoas} alt="Imagem de duas mãos com um coraçao no meio, representando solidariedade" />
                                <p>AJUDAR PESSOAS</p>
                            </div>
                        </div>
                    </section>

                    <div className="sn_h2_dev">
                        <h2>EQUIPE</h2>
                        <hr />
                    </div>
                    <section className="sn_dev">
                        <div className="dev">
                            <img src={bruna} alt="foto de perfil da desenvolvedora Bruna Ribeiro" />
                            <p>Bruna Ribeiro<br />Desenvolvedora Back-end</p>
                        </div>
                        <div className="dev">
                            <img src= {lucas} alt="foto de perfil do desenvolvedor Lucas Gregorio" />
                            <p>Lucas Gregorio <br />Desenvolvedor Front-end</p>
                        </div>
                        <div className="dev">
                            <img src= {nilson} alt="foto de perfil do desenvolvedor Nilson Ledres" />
                            <p>Nilson Ledres<br />Designer</p>
                        </div>
                        <div className="dev">
                            <img src= {paty} alt="foto de perfil da desenvolvedora Patrícia Haddad" />
                            <p>Patrícia Haddad<br />Desenvolvedora Front-end</p>
                        </div>
                        <div className="dev">
                            <img src= {rubao} alt="foto de perfil do desenvolvedor Ruben de Castro" />
                            <p>Ruben de Castro<br />Desenvolvedor Back-end</p>
                        </div>
                        <div className="dev">
                            <img src= {yasmin} alt="foto de perfil do desenvolvedora Yasmin Ribeiro" />
                            <p>Yasmin Ribeiro<br />Desenvolvedora Front-end</p>
                        </div>
                    </section>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

export default Sobrenos;