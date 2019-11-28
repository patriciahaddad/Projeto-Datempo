import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Produto from '../../assets/imagens/arroz.png';

class Carrinho extends Component {
    render() {
        return (
            <div>
                <Header />
                <main>
                    <div class="cont_branco">
                        <h2>CARRINHO</h2>
                        <hr />
                        <div class="container_carrinho">
                            <div class="card_carrinho">
                                <div class="img_carrinho">
                                    <img src= {Produto} alt="Pacote de Arroz de 5kg da marca Tio João" />
                                </div>
                                <div class="descricao_carrinho">
                                    <p class="titulo descricao">Arroz Tio jão</p>

                                    <div class="titulo_produto">
                                        <p class="titulo_descricao">Pacote de 5kg</p>
                                    </div>

                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Walmart - Santa Cecília</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card_carrinho2">
                                <div class="descricao_carrinho2">
                                    <p class="titulo_descricao">Validade</p>
                                    <p class="descricao">18/09/2019</p>
                                </div>
                                <div class="descricao_carrinho2">
                                    <p class="titulo_descricao">Preço</p>
                                    <p class="descricao">R$ 10,00</p>
                                </div>
                                <div class="descricao_carrinho2">
                                    <p class="titulo_descricao">Preço com desconto</p>
                                    <p class="descricao">R$ 8,00</p>
                                </div>
                            </div>
                        </div>

                        <div class="container_carrinho">
                            <div class="card_carrinho">
                                <div class="img_carrinho">
                                    <img src= {Produto}  alt="Pacote de Arroz de 5kg da marca Tio João" />
                                </div>
                                <div class="descricao_carrinho">
                                    <p class="titulo descricao">Arroz Tio jão</p>

                                    <div class="titulo_produto">
                                        <p class="titulo_descricao">Pacote de 5kg</p>
                                    </div>

                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Walmart - Santa Cecília</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card_carrinho2">
                                <div class="descricao_carrinho2">
                                    <p class="titulo_descricao">Validade</p>
                                    <p class="descricao">18/09/2019</p>
                                </div>
                                <div class="descricao_carrinho2">
                                    <p class="titulo_descricao">Preço</p>
                                    <p class="descricao">R$ 10,00</p>
                                </div>
                                <div class="descricao_carrinho2">
                                    <p class="titulo_descricao">Preço com desconto</p>
                                    <p class="descricao">R$ 8,00</p>
                                </div>
                            </div>
                        </div>

                        <div class="botoes_carrinho">
                            <a href="#" class="botao_carrinho">Continuar comprando</a>
                            <a href="#" class="btn_carrinho">Finalizar reserva</a>
                        </div>

                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Carrinho;