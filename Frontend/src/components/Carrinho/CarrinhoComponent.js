import React, { Component } from 'react';
import Relogio from '../../assets/imagens/alarm-clock.png';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Link, withRouter } from 'react-router-dom';


class CarrinhoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOferta: [],
            idOferta: "",

            modal: false,

            dataAtual: ""
        }
    }

    componentDidMount() {
        // console.log(ContagemDias);
        // console.log(DataHoraAtual);
    }

   
    

    //#region Toggle
    // toggle = () => {
    //     this.setState({
    //         modal: !this.state.modal,
    //     });
    // }
    // openModal = (o) => {
    //     this.toggle();

    //     this.setState({ getOferta: o }, () => {
    //         console.log("get", this.state.getOferta);
    //     });
    // }
    //#endregion

    ContagemDias = (validade) => {
        var dataAtual = new Date();
        var dataValidade = new Date(validade);
        var localdatevalidade = dataValidade.getDate() + '/' + (dataValidade.getMonth() + 1) + '/' + dataValidade.getFullYear() + ' ' + dataValidade.getHours() + ':' + dataValidade.getMinutes();


        var dataDif = ((dataValidade - dataAtual) / (1000 * 60 * 60 * 24)).toFixed(0);

        return dataDif + " dias!";
    }

    render() {
        return (
            <div>
            <div className="card_carrinho">
                <div className="img_carrinho">
                    <img src={"https://localhost:5000/imgOferta/" + this.props.imagem} />
                </div>
                <div className="descricao_carrinho">
                    <p className="titulo descricao">{this.props.nomeOferta}</p>
                    {/* 
                    <div className="titulo_produto">
                        <p className="titulo_descricao">Pacote de 5kg</p>
                    </div> */}

                    <div className="titulo_produto">
                        <p className="titulo descricao">Walmart - Santa Cecília</p>
                    </div>
                </div>
            </div>

            <div className="card_carrinho2">
                <div className="descricao_carrinho2">
                    <p className="titulo_descricao">Validade</p>
                <p className="descricao">{this.props.validade}</p>
                </div>
                <div className="descricao_carrinho2">
                    <p className="titulo_descricao">Preço</p>
                <p className="descricao">{this.props.preco}</p>
                </div>
                <div className="descricao_carrinho2">
                    <p className="titulo_descricao">Preço com desconto</p>
                    <p className="descricao">R$ 8,00</p>
                </div>
            </div>
            </div>
        )
    }
}

export default CarrinhoComponent;

