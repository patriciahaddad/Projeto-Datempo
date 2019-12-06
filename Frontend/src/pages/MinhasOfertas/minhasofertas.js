import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ImagemCard from '../../assets/imagens/arroz.png';
import Relogio from '../../assets/imagens/alarm-clock.png';
import api from '../../services/api';
import { MDBBtn, MDBInput, MDBAlert, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";
import CardOferta from '../../components/CardOferta/CardOferta';



class Minhasofertas extends Component {

    constructor() {
        super()
        this.state = {
            listaOferta: []
        }

            // modal: false
        }
    }

    toggle = () => {
        this.setstate({
            modal : !this.state.modal
        });
    }
    

    // putMinhasOfertas()
    // editar ofertas - vai pro modal

        // postMinhasOfertas()
    // //modal com as reservas
    
    
    // deleteMinhasOfertas()
    // //excluir oferta no modal quando clicar em editar na página

    


    render(){
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
                            <p className="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p>

                            </div>
                        
                    <CardOferta></CardOferta>

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

                <MDBContainer>
                {/* <form onSubmit={this.putEvento}> */}
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle}>RESERVAS</MDBModalHeader>
                    <MDBModalBody>

                    <form class="formulario-reservas" action="/">
                    <table class="tabela_reservas">
                        <thead>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Quantidade de reservas</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Nome</td>
                                <td>Qnt</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Nome</td>
                                <td>Qnt</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Nome</td>
                                <td>Qnt</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Nome</td>
                                <td>Qnt</td>
                            </tr>
                        </tbody>

                    </table>
                    <div class="position-right">
                       
                    </div>
                </form>
  
                </MDBModalBody>
                <MDBModalFooter>
                    <   MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                        <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {/* </form> */}
            </MDBContainer>
                <Footer />
            </div>
        );
    }
export default Minhasofertas;

              
                // {/* <button type="submit">SALVAR</button>
                //         <button type="submit">DESATIVAR OFERTA</button> */}