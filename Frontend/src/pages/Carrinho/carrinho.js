import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Produto from '../../assets/imagens/arroz.png';
import CarrinhoComponent from '../../components/Carrinho/CarrinhoComponent'
import api from '../../services/api';


class Carrinho extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOferta: [],

            modal: false,
        }
    }

    getOferta = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                }
            })
    }


    render() {
        return (
            <div>
                <Header />
                <main>
                    <div className="cont_branco">
                        <h2>CARRINHO</h2>
                        <hr />
                        <div className="container_carrinho">
                        {
                                    
                                    this.state.listaOferta.map(function (o) {
                                        return (
                                            <div key={o.idOferta}>
                                                <CarrinhoComponent
                                                    idOferta={o.idOferta}
                                                    nomeOferta={o.nomeOferta}
                                                    validade={o.validade}
                                                    preco={o.preco.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 3 })}
                                                    imagem={o.imagem}
                                                />
                                            </div>
                                        )
                                    }
                                    )
                                }
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