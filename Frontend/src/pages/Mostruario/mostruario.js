import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';

import CardOferta from '../../components/CardOferta/cardOferta';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
    "mdbreact";
import NativeSelect from '@material-ui/core/NativeSelect';

class Mostruario extends Component {

    constructor() {
        super()

        this.state = {
            listaOferta: [],
            listaCategoria: [],
            listaFiltro: [],

            setStateFiltro: ""
        }
    }

    componentDidMount() {
        console.log(this.state.listaOferta);
        console.log(this.state.listaCategoria);
        console.log(this.state.setStateFiltro);

        this.getCategoria();
        this.getOferta();
    }

    componentDidUpdate() {
        console.log("Update");
    }

    getCategoria = () => {
        api.get('/categoria')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaCategoria: response.data });
                }
            })
    }

    getOferta = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                }
            })
    }
    //Método para filtrar a categoria
    getFiltro = () => {
        api.get('/filtro/filtrarcategoria/' + this.state.setStateFiltro)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                }
            })
    }

    //Atualiza o estado do valo do select
    atualizaSelect = (value) => {
        this.setState({ setStateFiltro: value })
        setTimeout(() => {
            this.getFiltro();
        }, 1000);
    }

    render() {
        return (
            <div>
                <Header />
                <main>

                    <MDBCarousel
                        activeItem={1}
                        length={3}
                        showControls={true}
                        showIndicators={true}
                        className="z-depth-1"
                    >
                        <MDBCarouselInner>
                            <MDBCarouselItem itemId="1">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                        alt="First slide"
                                    />
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="2">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                                        alt="Second slide"
                                    />
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="3">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                        alt="Third slide"
                                    />
                                </MDBView>
                            </MDBCarouselItem>
                        </MDBCarouselInner>
                    </MDBCarousel>

                    <h2>OFERTAS</h2>
                    <hr />

                    <section className="filtro">
                        <div className="container_filtro">
                            <div className="categoria_filtro">
                                <label>Categoria:</label>
                                <select name="idCategoria" id="cmbCategoria"
                                    onChange={(e) => this.atualizaSelect(e.target.value)}>
                                    {
                                        this.state.listaCategoria.map(function (c) {
                                            return (
                                                <option
                                                    key={c.idCategoria}
                                                    value={c.nomeCategoria}
                                                >
                                                    {c.nomeCategoria}
                                                </option>
                                            )
                                        }.bind(this))
                                    }
                                </select>
                            </div>

                            <div className="categoria_filtro">
                                <label>Ordernar:</label>
                                <select name="relevantes" id="cmbRelevante">
                                    <option value="maisRelevantes">Mais relevantes</option>
                                    <option value="menorPreco">Menor Preço</option>
                                    <option value="maiorPreco">Maior Preço</option>
                                </select>
                            </div>
                            <div className="categoria_filtro">
                                <label>Produtos na Página:</label>
                                <select name="qntProdutos" id="cmbRelevante">
                                    <option value="quinzeProdutos">12 Produtos</option>
                                    <option value="trintaProdutos">24 Produtos</option>
                                    <option value="quarentaProdutos">36 Produtos</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <p className="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p>
                    <section className="produtos">
                        <div className="container">
                            <div className="container_ofertas">
                                <CardOferta filtro={this.state.setStateFiltro} />

                            </div>
                            <div className="paginacao_ofertas">
                                <ul className="lista_paginacao">
                                    <a href="#" clas="lk_paginacao">
                                        <li>  </li>
                                    </a> <a href="#">
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
                                        <li>></li>
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div >

        );
    }

}
export default Mostruario;
