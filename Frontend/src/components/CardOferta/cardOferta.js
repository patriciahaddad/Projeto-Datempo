
import React, { Component } from 'react';
import Relogio from '../../assets/imagens/alarm-clock.png';
import api from '../../services/api';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';



class CardOferta extends Component {
    constructor(props) {
        super(props)
        this.state = {

            listaOferta: [],
            listaFiltrada: [],

            //State para aparecer no modal do card
            getOferta: {
                idOferta: "",
                nomeOferta: "",
                marca: "",
                validade: "",
                quantVenda: "",
                preco: "",
                imagem: React.createRef(),
                descricao: "",
                idUsuario: "",
                idProduto: ""
            },
            modal: false
        }
    }

    componentDidMount() {
        // console.log(this.state.listaOferta);
        this.getOferta();
    }

    //#region TogleModal
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }
    openModal = (o) => {
        this.toggle();

        this.setState({ getOferta: o }, () => {
            console.log("get", this.state.getOferta);
        });
    }
    //#endregion

    //#region GET Oferta
    getOferta = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                    console.log(response.data);
                }
            })
    }
    //#endregion
    
    render() {
        return (
            <div className="container_ofertas">
                {
                    this.state.listaOferta.map(function (o) {
                        return (
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={"https://localhost:5001/imgOferta/" + o.imagem}
                                        alt="Pacote de Arroz de 5kg da marca Tio João" />
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">{o.nomeOferta}</p>
                                    </div>
                                    <div className="descricao_produto">
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">de R$ 8,00</p>
                                            <p className="titulo_preco">Por</p>
                                            <p className="preco_descricao">R$ {o.preco.toLocaleString("pt-br",{minimumFractionDigits: 2, maximumFractionDigits: 3})}</p>
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
                                    <button className="btn_reservar" onClick={() => this.openModal(o)}>RESERVAR</button>
                                </div>
                            </div>
                        )
                    }.bind(this))
                }
                <MDBContainer  >
                    {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
                        <MDBModalBody>
                            <div className="div_conteudo_modal">
                                <div className="imagem_modal">
                                    <img className="imgproduto" src={"https://localhost:5001/imgOferta/" + this.state.getOferta.imagem}
                                        alt="Pacote de Arroz de 5kg da marca Tio João" />
                                </div>

                                <div className="div_modal_oferta">

                                    <label className="modal_info_oferta">
                                        {this.state.getOferta.nomeOferta}
                                    </label>

                                    <label className="modal_info_oferta">
                                        Preco : R$ {this.state.getOferta.preco.toLocaleString("pt-br",{minimumFractionDigits: 2, maximumFractionDigits: 3})}
                                    </label>

                                    <label className="modal_info_oferta">
                                        Validade: {this.state.getOferta.validade} 
                                    </label>

                                    <label className="modal_info_oferta">Faltam : 20 dias
                                    </label>
                                </div>
                            </div>
                            <br/>
                            <textarea
                                type="text"
                                id="defaultFormContactMessageEx"
                                className="modal_descricao_oferta"
                                name="descricao"
                                placeholder="Descrição do produto"
                                disabled
                                value={this.state.getOferta.descricao}
                            // value={this.state.putOferta.descricao}
                            // onChange={this.putSetState}
                            />
                        </MDBModalBody>
                        
                            
                        <div className="modal_botoes">
                            <button className="modal_botao_confirmar_reserva" onClick={this.toggle}>CONFIRMAR RESERVA</button>
                            <button className="modal_botao_adicionar_carrinho" onClick= {this.toggle}>ADICIONAR AO CARRINHO</button>
                        </div>
                            {/* <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn> */}
                        
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }

}

export default CardOferta;

