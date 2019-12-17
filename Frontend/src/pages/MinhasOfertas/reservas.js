import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from '../../services/api';
import Alert from 'react-bootstrap/Alert';


import {
    MDBBtn,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBAlert,
    MDBInput
} from 'mdbreact';


class Reservas extends Component {
    constructor() {
        super()
        this.state = {
            listaReservaOferta: [],
            mensagemSucesso: ""
        }

    }

    componentDidMount() {
        this.getReservaOferta();
    }

    deletarReserva = (id) => {
        api.delete("reserva/" + id)
            .then(() => {
                this.setState({ mensagemSucesso: "Reserva Entregue com sucesso!" })
                setTimeout(() => {
                    this.getReservaOferta()
                }, 1500)
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

    render() {
        return (
            <div>
                <Header />

                <main>
                    <div className="cont_branco">
                        <div>
                            {
                                this.state.mensagemSucesso &&
                                <Alert variant="success" dismissible>
                                <Alert.Heading>{this.state.mensagemSucesso}</Alert.Heading>
                                </Alert>
                            }

                        </div>

                        <div className="ofertas_cadastradas">


                            <h2>RESERVAS</h2>
                            <hr />
                            <MDBTable className="cont_table">
                                <MDBTableHead >
                                    <tr className="table_resti">
                                        <th>#Oferta</th>
                                        <th>Nº Reserva</th>
                                        <th>Quantidade</th>
                                        <th>Data</th>
                                        <th>PIN</th>
                                        <th>Usuário</th>
                                        <th>Ações</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody >
                                    {
                                        this.state.listaReservaOferta.map(
                                            function (r) {
                                                return (
                                                    <tr key={r.idOferta} className="table_rescont">
                                                        <td>{r.idOfertaNavigation.nomeOferta}</td>
                                                        <td>{r.idReserva}</td>
                                                        <td>{r.quantCompra}</td>
                                                        <td>{r.dataReserva}</td>
                                                        <td>{r.pin}</td>
                                                        <td>{r.idUsuarioNavigation.nome}</td>
                                                        <td>
                                                            <MDBBtn color="green" size="sm" onClick={() => this.deletarReserva(r.idReserva)}>
                                                                Entregue
                                                                </MDBBtn>
                                                        </td>
                                                    </tr>
                                                )
                                            }.bind(this)
                                        )
                                    }
                                </MDBTableBody>
                            </MDBTable>
                            <hr/>
                        </div>



                        {/* <div className="paginacao_ofertas">
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
                        </div> */}
                    </div>
                </main>
                <Footer />
            </div >
        );
    }
}

export default Reservas;
