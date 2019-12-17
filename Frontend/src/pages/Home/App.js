import React from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import ImagemCard from '../../assets/imagens/arroz.png';
import Relogio from '../../assets/imagens/alarm-clock.png';
import MarcaDia from '../../assets/imagens/logodia.svg';
import MarcaWalmart from '../../assets/imagens/walmart.png';
import MarcaCalvin from '../../assets/imagens/prada.png';
import MarcaPrada from '../../assets/imagens/CalvinKleinlogo.svg';
import banner from '../../assets/imagens/bannerAlimento.png';
import banner2 from '../../assets/imagens/BannerFrutas.jpg';
import banner3 from '../../assets/imagens/bannerA.png';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from
    "mdbreact";
import { isModuleDeclaration } from '@babel/types';

function App() {
    return (
        <div>
            <Header></Header>
            <main>
                <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} className="z-depth-1">
                    <MDBCarouselInner>
                        <MDBCarouselItem itemId="1">
                            <MDBView>
                            <a href="/mostruario"><img className="d-block w-100" src={banner} alt="First slide" /></a>
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="2">
                            <MDBView>
                                <a href="/mostruario"><img className="d-block w-100" src={banner2}alt="Second slide" /></a>
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="3">
                            <MDBView>
                                <a href="/mostruario"><img className="d-block w-100" src={banner3} alt="Third slide" /></a>
                            </MDBView>
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
            <section>
                <div className="container">
                    <h2>OFERTAS DATEMPO</h2>
                    <hr />
                    <div className="container_card">
                        
                        <div className="card_oferta">
                            <div className="caixa_imagem">
                                <img className="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div className="descricao_oferta">
                                <div className="titulo_produto">
                                    <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div className="descricao_produto">
                                    <div className="descricao_pequena">
                                        <p className="titulo_descricao">de R$ 8,00</p>
                                        <p className="titulo_preco">Por</p>
                                        <p className="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div className="descricao_pequena_logo">
                                        <p className="titulo_descricao_logo">DATEMPO</p>
                                        <div className="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p className="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="botao_reservar">
                                <button className="btn_reservar">RESERVAR</button>
                            </div>
                        </div>
                        <div className="card_oferta">
                            <div className="caixa_imagem">
                                <img className="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div className="descricao_oferta">
                                <div className="titulo_produto">
                                    <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div className="descricao_produto">
                                    <div className="descricao_pequena">
                                        <p className="titulo_descricao">de R$ 8,00</p>
                                        <p className="titulo_preco">Por</p>
                                        <p className="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div className="descricao_pequena_logo">
                                        <p className="titulo_descricao_logo">DATEMPO</p>
                                        <div className="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p className="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="botao_reservar">
                                <button href="#" className="btn_reservar">RESERVAR</button>
                            </div>
                        </div>
                        <div className="card_oferta">
                            <div className="caixa_imagem">
                                <img className="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div className="descricao_oferta">
                                <div className="titulo_produto">
                                    <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div className="descricao_produto">
                                    <div className="descricao_pequena">
                                        <p className="titulo_descricao">de R$ 8,00</p>
                                        <p className="titulo_preco">Por</p>
                                        <p className="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div className="descricao_pequena_logo">
                                        <p className="titulo_descricao_logo">DATEMPO</p>
                                        <div className="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p className="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="botao_reservar">
                                <button href="#" className="btn_reservar">RESERVAR</button>
                            </div>
                        </div>
                        <div className="card_oferta">
                            <div className="caixa_imagem">
                                <img className="imgproduto" src={ImagemCard}
                                    alt="Pacote de Arroz de 5kg da marca Tio João" />
                            </div>
                            <div className="descricao_oferta">
                                <div className="titulo_produto">
                                    <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                </div>
                                <div className="descricao_produto">
                                    <div className="descricao_pequena">
                                        <p className="titulo_descricao">de R$ 8,00</p>
                                        <p className="titulo_preco">Por</p>
                                        <p className="preco_descricao">R$ 5,00</p>
                                    </div>

                                    <div className="descricao_pequena_logo">
                                        <p className="titulo_descricao_logo">DATEMPO</p>
                                        <div className="validade_mostruario">
                                            <img src={Relogio} alt="Alarme" />
                                            <p className="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="botao_reservar">
                                <button href="#" className="btn_reservar">RESERVAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sobre">
                <div className="banner_sobre">
                    <h2>SOBRE NÓS</h2>
                    <hr/>
                    <p><br /> Você encontrará em nossa plataforma ofertas de produtos como: alimentos que estão perto do
                        vencimento e vestimentas que possuem pouca circulação no estoque. Saiba mais sobre nosso
                        propósito!<br/>
                        Nunca é tarde, sempre DATEMPO! </p>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2>EMPRESAS PARCEIRAS</h2>
                    <hr />
                    <div className="container_marcas">
                        <img src={MarcaDia} alt="Logo Dia" />
                        <img src={MarcaWalmart} alt="Logo Walmart" />
                        <img src={MarcaPrada} alt="Logo Prada" />
                        <img src={MarcaCalvin} alt="Logo Calvin Klein" />
                    </div>
                </div>
            </section>
            </main>
            <Footer></Footer>
        </div >
    );
}



export default App;
