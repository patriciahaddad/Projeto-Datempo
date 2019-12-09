import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from '../../services/api';

import {
    MDBBtn,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBInput
} from 'mdbreact';

import Produto from '../../assets/imagens/arroz.png';
import Relogio from '../../assets/imagens/alarm-clock.png';


class Reservas extends Component {
    constructor() {
        super()
        this.state = {
            listaReservaOferta: [],
        }

    }

    componentDidMount() {
        this.getReservaOferta();
    }

    getReservaOferta = () => {
        api.get('/reserva')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaReservaOferta: response.data });
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
                            <h2>RESERVAS</h2>
                            <hr />
                            <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#Oferta</th>
                                            <th>#Reserva</th>
                                            <th>Quantidade</th>
                                            <th>Data</th>
                                            <th>PIN</th>
                                            <th>Usuário</th>
                                            <th>Ações</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            this.state.listaReservaOferta.map(
                                                function (r) {
                                                    return (
                                                        <tr key={r.idOferta}>
                                                            <td>{r.idOferta}</td>
                                                            <td>{r.idReserva}</td>
                                                            <td>{r.quantCompra}</td>
                                                            <td>{r.dataReserva}</td>
                                                            <td>{r.pin}</td>
                                                            <td>{r.idUsuarioNavigation.nome}</td>
                                                            <td>
                                                                <MDBBtn color="danger" size="sm" onClick={() => this.deleteCategoria(r.idCategoria)}>
                                                                    Excluir
                                                                </MDBBtn>
                                                            </td>
                                                        </tr>
                                                    )
                                                }.bind(this)
                                            )
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                        </div>



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

export default Reservas;
