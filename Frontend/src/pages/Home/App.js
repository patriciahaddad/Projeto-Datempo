import React from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import ImagemCard from '../../assets/imagens/arroz.png';
import Relogio from '../../assets/imagens/alarm-clock.png';
import MarcaDia from '../../assets/imagens/logodia.svg';
import MarcaWalmart from '../../assets/imagens/walmart.png';
import MarcaCalvin from '../../assets/imagens/prada.png';
import MarcaPrada from '../../assets/imagens/CalvinKleinlogo.svg';

function App() {
    return (
        <div>
            <Header></Header>
            <div class="banner"></div>
            <section>
                <div class="container">
                    <h2>OFERTAS DATEMPO</h2>
                    <hr />
                    <div class="container_card">
                        <div class="card_oferta">
                            <div class="caixa_imagem">
                                <img class="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div class="descricao_oferta">
                                <div class="titulo_produto">
                                    <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div class="descricao_produto">
                                    <div class="descricao_pequena">
                                        <p class="titulo_descricao">de R$ 8,00</p>
                                        <p class="titulo_preco">Por</p>
                                        <p class="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div class="descricao_pequena_logo">
                                        <p class="titulo_descricao_logo">DATEMPO</p>
                                        <div class="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p class="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="botao_reservar">
                                <a href="#" class="btn_reservar">RESERVAR</a>
                            </div>
                        </div>
                        <div class="card_oferta">
                            <div class="caixa_imagem">
                                <img class="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div class="descricao_oferta">
                                <div class="titulo_produto">
                                    <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div class="descricao_produto">
                                    <div class="descricao_pequena">
                                        <p class="titulo_descricao">de R$ 8,00</p>
                                        <p class="titulo_preco">Por</p>
                                        <p class="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div class="descricao_pequena_logo">
                                        <p class="titulo_descricao_logo">DATEMPO</p>
                                        <div class="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p class="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="botao_reservar">
                                <a href="#" class="btn_reservar">RESERVAR</a>
                            </div>
                        </div>
                        <div class="card_oferta">
                            <div class="caixa_imagem">
                                <img class="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div class="descricao_oferta">
                                <div class="titulo_produto">
                                    <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div class="descricao_produto">
                                    <div class="descricao_pequena">
                                        <p class="titulo_descricao">de R$ 8,00</p>
                                        <p class="titulo_preco">Por</p>
                                        <p class="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div class="descricao_pequena_logo">
                                        <p class="titulo_descricao_logo">DATEMPO</p>
                                        <div class="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p class="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="botao_reservar">
                                <a href="#" class="btn_reservar">RESERVAR</a>
                            </div>
                        </div>
                        <div class="card_oferta">
                            <div class="caixa_imagem">
                                <img class="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div class="descricao_oferta">
                                <div class="titulo_produto">
                                    <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div class="descricao_produto">
                                    <div class="descricao_pequena">
                                        <p class="titulo_descricao">de R$ 8,00</p>
                                        <p class="titulo_preco">Por</p>
                                        <p class="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div class="descricao_pequena_logo">
                                        <p class="titulo_descricao_logo">DATEMPO</p>
                                        <div class="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p class="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="botao_reservar">
                                <a href="#" class="btn_reservar">RESERVAR</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="sobre">
                <div class="banner_sobre">
                    <h2><a href="sobrenos.html" title="Institucional"> SOBRE NÓS </a></h2>
                    <hr />
                    <p><br /> Você encontrará em nossa plataforma ofertas de produtos como: alimentos que estão perto do
                        vencimento e vestimentas que possuem pouca circulação no estoque. Saiba mais sobre nosso
                    propósito!<br />
                        Nunca é tarde, sempre DATEMPO! </p>
                </div>
            </section>
            <section>
                <div class="container">
                    <h2>EMPRESAS PARCEIRAS</h2>
                    <hr />
                    <div class="container_marcas">
                        <img src={MarcaDia} alt="Logo Dia" />
                        <img src={MarcaWalmart} alt="Logo Walmart" />
                        <img src={MarcaPrada} alt="Logo Prada" />
                        <img src={MarcaCalvin} alt="Logo Calvin Klein" />
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div >
    );
}



export default App;
