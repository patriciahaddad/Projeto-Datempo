import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Relogio from '../../assets/imagens/alarm-clock.png';
import api from '../../services/api';
import { MDBInput, MDBModal, MDBBtn, MDBModalFooter, MDBModalHeader, MDBModalBody } from
    "mdbreact";


class Minhasofertas extends Component {
    
    toggle = () => {
        this.setState({
          modal: !this.state.modal,
        });
      }      

    componentDidMount() {
        this.getOfertas();
    }

    openModal = (o) => {
        this.toggle();

        this.setState({ putOferta: o });
        console.log("PUT", this.state.putOferta);
    }

    openPagina = (o) => {
        this.toggle();

        this.setState({ putOferta: o });
        console.log("PUT", this.state.putOferta);
    }

    getOfertas = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOfertas: response.data })
                }
            })
    }

    getReservaOferta = () => {
        api.get('/reserva')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaReservaOferta: response.data });
                }
            })
    }

    //#region PUT

    putSetState = (input) => {
        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.value
            }
        })
    }

    putOferta = (event) => {
        event.preventDefault();
        let oferta_id = this.state.putOferta.idOferta;
        let oferta_alterado = this.state.putOferta;

        api.put('/oferta/' + oferta_id, oferta_alterado)
            .then(() => {
                this.setState({ sucessMsg: "Oferta alterada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar a Oferta!" });
            })

        this.toggle();

        setTimeout(() => {
            this.getMinhasOfertas();
        }, 1500);
    }


    render() {
        return (
            <div>
                <Header />
                <main>
                    <div className="cont_branco">
                        <div className="ofertas_cadastradas">
                            <h2>MINHAS OFERTAS</h2>
                            <hr />
                            <div className="filtro">
                                <div className="filtros">
                                    <a href="cadastroOfertas.html" className="btn_cria_Oferta">cadastrar ofertas</a>
                                    <a href="#" className="btn-filtro">Selecione por:</a>
                                </div>
                            </div>
                            <p className="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p>
                        </div>

                        {
                            this.state.listaOfertas.map(function (o) {
                                return (
                                    <div className="card_oferta" key={o.idOferta}>
                                        <div className="caixa_imagem">
                                            <img className="imgproduto" 
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
                                            <MDBBtn color="primary" size="sm" onClick={() => this.openModal(o)}>
                                                EDITAR
                                            </MDBBtn>

                                            <MDBBtn color="danger" size="sm" onClick={() => this.openModalReservaOferta(o)}>
                                                RESERVAS
                                            </MDBBtn>
                                        </div>
                                    </div>
                                )
                            }.bind(this))
                        }

                            {/* Modal Editar Oferta */}
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg">
                                <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putOferta.nomeOferta} </MDBModalHeader>
                                <form className="formulario-cad_modal" onSubmit={this.putOferta}>
                                    <MDBModalBody>
                                        {/* <input type="image" name="imagem" value={this.state.putOferta.imagem} onChange={this.putSetState}/> */}
                                        
                                            <MDBInput name="nomeOferta" value={this.state.putOferta.nomeOferta} onChange={this.putSetState}/>
                                        
                                            <MDBInput name="marca" value={this.state.putOferta.marca} onChange={this.putSetState} />
                                        
                                            <MDBInput name="preco" value={this.state.putOferta.preco} onChange={this.putSetState}/>
                                            <MDBInput name="validade" value={this.state.putOferta.validade} onChange={this.putSetState}/>
                                        
                                            <MDBInput name="quantVenda" value={this.state.putOferta.quantVenda} onChange={this.putSetState}/>
                                       
                                            <textarea className="form_adicionais" name="descricao" value={this.state.putOferta.descricao} onChange={this.putSetState}> </textarea>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                        <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                    </MDBModalFooter>
                                </form>
                            </MDBModal>

                        <div className="paginacao_ofertas">
                            <ul className="lista_paginacao">
                                <a href="#" clas="lk_paginacao">
                                    <li>
                                    </li>  </a> <a href="#">
                                    <li>1</li>
                                </a>
                                <a href="#">
                                    <li>2</li>
                                </a>
                                <a href="#">
                                    <li>3</li>
                                </a>
                                <a href="#">
                                    <li>...</li>
                                </a>
                                <a href="#">
                                    <li> > </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </main>
                <Footer />
            </div >
        );
    }
}

export default Minhasofertas;
