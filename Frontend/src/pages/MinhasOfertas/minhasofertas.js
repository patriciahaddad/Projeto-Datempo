import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import Produto from '../../assets/imagens/arroz.png';
import Relogio from '../../assets/imagens/alarm-clock.png';
import api from '../../services/api';
import { bindExpression } from '@babel/types';


class Minhasofertas extends Component {
    constructor() {
        super()
        this.state = {
            listaMinhasOfertas: [],
            listaReservaOferta: [],


            modal1: false,
            modal2: false,
            modal3: false
        }

    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }

    componentDidMount() {
        this.getMinhasOfertas();
        this.getReservaOferta();
    }

    openModalReservaOferta = (r) => {
        this.toggle(1);
        this.setState({ getReservaOferta: r });
        console.log("GET", this.state.getReservaOferta);
    }

    openModalEditarOferta = (edOferta) => {
        this.toggle();
        this.setState({ getEditarOferta: edOferta });
        console.log("PUT", this.state.getEditarOferta);
    }

    getMinhasOfertas = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaMinhasOfertas: response.data });
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

    putSetState = (input) => {
        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.value
            }
        })
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
                            this.state.listaMinhasOfertas.map(function (o) {
                                return (
                                    <div className="card_oferta">
                                        <div className="caixa_imagem">
                                            <img className="imgproduto" src={Produto}
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
                                            <MDBBtn color="primary" size="sm">
                                                <i className="fas fa-edit">EDITAR</i>
                                            </MDBBtn>

                                            <button color="danger" size="sm" onClick={this.toggle(1)}>
                                                RESERVAS
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* Modal de reserva */}

                        
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle(1)} centered>
                            <MDBModalHeader toggle={this.toggle(1)}>Categorias</MDBModalHeader>
                            <MDBModalBody>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#</th>
                                            <th>Categoria</th>
                                            <th>Ações</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle(1)}>Fechar</MDBBtn>
                                <MDBBtn color="primary">Salvar</MDBBtn>
                            </MDBModalFooter>
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
            </div>
        );
    }
}

export default Minhasofertas;