import React, { Component } from 'react';
import Relogio from '../../assets/imagens/alarm-clock.png';
import api from '../../services/api';


class CardOferta extends Component {
    constructor() {
        super()
        this.state = {
            listaOferta: [],
            listaFiltrada: []
        }

    }

    componentDidMount() {
        // console.log(this.state.listaOferta);
        this.getOferta();
    }

    getOferta = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                    console.log(response.data);
                }
            })
    }


    render() {
        return (
            <div className="container_ofertas">
                {
                    this.state.listaOferta.filter(card => card.idProdutoNavigation.idCategoriaNavigation.nomeCategoria == this.props.filtro).map(function (o) {
                        return (
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    {/* <img className="imgproduto" src="https://localhost:5001/api/imgOferta/" {...this.card.imagem}
                                        alt="Pacote de Arroz de 5kg da marca Tio João" /> */}
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">{o.nomeOferta}</p>
                                    </div>
                                    <div className="descricao_produto">
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">de R$ 8,00</p>
                                            <p className="titulo_preco">Por</p>
                                            <p className="preco_descricao">R$ {o.preco.toFixed(2)}</p>
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
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>

                            </div>
                        )

                    })

                }
            </div>
        )
    }

}

export default CardOferta;

