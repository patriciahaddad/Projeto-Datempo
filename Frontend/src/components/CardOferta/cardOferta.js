import React, { Component } from 'react';
import Relogio from '../../assets/imagens/alarm-clock.png';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBAlert } from 'mdbreact';
import { Link, withRouter } from 'react-router-dom';



class cardOferta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOferta: [],
            idOferta : this.props.idOferta,


            modal: false,

            dataAtual: ""
        }
    }
    
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({idOferta : this.props.idOferta})
        }, 100);
    }

    //#region Toggle
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
    
    ContagemDias = (validade) => {
        var dataAtual = new Date();
        var dataValidade = new Date(validade);
        var localdatevalidade = dataValidade.getDate() + '/' + (dataValidade.getMonth()+1) + '/' + dataValidade.getFullYear() + ' ' + dataValidade.getHours() + ':' + dataValidade.getMinutes();
        var dataDif = ((dataValidade - dataAtual)/(1000*60*60*24)).toFixed(0);
        return dataDif + " dias!";
    }

    render() {
        return (
                <div key = {this.props.idOferta}className="card_oferta">
                    <div className="caixa_imagem">
                        <img className="imgproduto" src={"https://localhost:5001/imgOferta/" + this.props.imagem}
                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                    </div>
                    <div className="descricao_oferta">
                        <div className="titulo_produto">
                            <p className="titulo descricao">{this.props.nomeOferta}</p>
                        </div>
                        <div className="descricao_produto">
                            <div className="descricao_pequena">
                                <p className="titulo_descricao">de R$ 8,00</p>
                                <p className="titulo_preco">Por</p>
                                <p className="preco_descricao">R$ {this.props.preco} </p>
                            </div>

                            <div className="descricao_pequena_logo">
                                <p className="titulo_descricao_logo">DATEMPO</p>
                                <div className="validade_mostruario">
                                    <img src={Relogio} alt="Alarme" />
                                    <p className="descricao"> Faltam: {this.ContagemDias(this.props.validade)}</p>
                                </div>
                            </div>
                        </div>
                        {/* {ContagemDias(this.props.validade)} */}
                    </div>
                    <div className="botao_reservar">
                        <button className="btn_reservar" onClick={() => this.openModal()}>RESERVAR</button>
                    </div>
             <MDBContainer >
             {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
             <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                 {/* <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader> */}
                 <MDBModalBody>
                     <div className="div_conteudo_modal">
                         <div className="imagem_modal">
                             <img className="imgproduto" src={"https://localhost:5001/imgOferta/" + this.props.imagem}
                                 alt="Pacote de Arroz de 5kg da marca Tio Jão" />
                         </div>

                         <div className="div_modal_oferta">

                             <label className="modal_info_oferta">
                                 {this.props.nomeOferta}
                             </label>

                             <label className="modal_info_oferta">
                                 Preco : R$ {this.props.preco}
                             </label>

                             <label className="modal_info_oferta">
                                 Validade: {this.props.validade} 
                             </label>

                             <label className="modal_info_oferta">Faltam : {this.ContagemDias(this.props.validade)}
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
                         value={this.props.descricao}
                    />
                 </MDBModalBody>    
                 <div className="modal_botoes">
                     <button className="modal_botao_confirmar_reserva" onClick={this.toggle}>FECHAR</button>
                     {/* <Link to="/carrinho"  className="modal_botao_adicionar_carrinho" onClick= {this.toggle} value={this.props.getOfertaId}>ADICIONAR AO CARRINHO</Link> */}
                     <Link className="modal_botao_adicionar_carrinho" onClick={() => (console.log("idOferta do card: ", this.props.idOferta))} to={{
                                    pathname : "/carrinho",
                                    idOferta : this.state.idOferta
                                }}>ADICIONAR AO CARRINHO</Link>       
                 </div> 
             </MDBModal>
         </MDBContainer>
         </div>
         
        )
    }
}

export default cardOferta;

