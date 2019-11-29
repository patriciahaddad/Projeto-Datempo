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
                    <div className="cont_branco">
                        <h2>CARRINHO</h2>
                        <hr />
                        <div className="container_carrinho">
                            <div className="card_carrinho">
                                <div className="img_carrinho">
                                    <img src= {Produto} alt="Pacote de Arroz de 5kg da marca Tio João" />
                                </div>
                                <div className="descricao_carrinho">
                                    <p className="titulo descricao">Arroz Tio jão</p>

                                    <div className="titulo_produto">
                                        <p className="titulo_descricao">Pacote de 5kg</p>
                                    </div>

                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Walmart - Santa Cecília</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card_carrinho2">
                                <div className="descricao_carrinho2">
                                    <p className="titulo_descricao">Validade</p>
                                    <p className="descricao">18/09/2019</p>
                                </div>
                                <div className="descricao_carrinho2">
                                    <p className="titulo_descricao">Preço</p>
                                    <p className="descricao">R$ 10,00</p>
                                </div>
                                <div className="descricao_carrinho2">
                                    <p className="titulo_descricao">Preço com desconto</p>
                                    <p className="descricao">R$ 8,00</p>
                                </div>
                            </div>
                        </div>

                        <div className="container_carrinho">
                            <div className="card_carrinho">
                                <div className="img_carrinho">
                                    <img src= {Produto}  alt="Pacote de Arroz de 5kg da marca Tio João" />
                                </div>
                                <div className="descricao_carrinho">
                                    <p className="titulo descricao">Arroz Tio jão</p>

                                    <div className="titulo_produto">
                                        <p className="titulo_descricao">Pacote de 5kg</p>
                                    </div>

                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Walmart - Santa Cecília</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card_carrinho2">
                                <div className="descricao_carrinho2">
                                    <p className="titulo_descricao">Validade</p>
                                    <p className="descricao">18/09/2019</p>
                                </div>
                                <div className="descricao_carrinho2">
                                    <p className="titulo_descricao">Preço</p>
                                    <p className="descricao">R$ 10,00</p>
                                </div>
                                <div className="descricao_carrinho2">
                                    <p className="titulo_descricao">Preço com desconto</p>
                                    <p className="descricao">R$ 8,00</p>
                                </div>
                            </div>
                        </div>

                        <div className="botoes_carrinho">
                            <button className="botao_carrinho">Continuar comprando</button>
                            <button className="btn_carrinho">Finalizar reserva</button>
                        </div>

                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Carrinho;