import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Produto from '../../assets/imagens/arroz.png';
import Relogio from '../../assets/imagens/alarm-clock.png';
import banner from '../../assets/imagens/bannerAlimento.png'
import api from '../../services/api';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
    "mdbreact";
import NativeSelect from '@material-ui/core/NativeSelect';



class Mostruario extends Component {

    constructor() {
        super()

        this.state = {
            listaOferta: [],
            listaCategoria: [],
            listaProduto: [],

            postCategoria: {
                idCategoria : "",
                nomeCategoria : "",
                produto:  ""
            }
        }
    }

    componentDidMount() {
        console.log(this.state.listaOferta);
        this.getCategoria();
        this.getOferta();
        this.getProduto();
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
    getProduto = () => {
        api.get('/produto')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProduto: response.data });
                }
            })
    }

    // postSetState = (input) =>{
    //     this.setState({
    //         postCategoria : {
    //             ...this.state.postCategoria, [input.target.name] : input.target.value

    //         }
    //     })
    // }

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
                                    // value={this.listaCategoria}
                                    onChange={this.postSetState}>
                                    {
                                        this.state.listaCategoria.map(function (c) {
                                            return (
                                                <option
                                                    key={c.idCategoria}
                                                    value={c.produto.idProduto}
                                                >
                                                    {c.nomeCategoria}
                                                </option>
                                            )
                                        })
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

                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>

                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                    <img src="imagens/alarm-clock.png" alt="Alarme" />
                                                    <p className="descricao"> Faltam: 10 dias!</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="botao_reservar">
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>
                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                    <img src="imagens/alarm-clock.png" alt="Alarme" />
                                                    <p className="descricao"> Faltam: 10 dias!</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="botao_reservar">
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>
                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                    <img src="imagens/alarm-clock.png" alt="Alarme" />
                                                    <p className="descricao"> Faltam: 10 dias!</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="botao_reservar">
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>
                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                    <img src="imagens/alarm-clock.png" alt="Alarme" />
                                                    <p className="descricao"> Faltam: 10 dias!</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="botao_reservar">
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>
                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                    <img src="imagens/alarm-clock.png" alt="Alarme" />
                                                    <p className="descricao"> Faltam: 10 dias!</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="botao_reservar">
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>
                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                    <img src="imagens/alarm-clock.png" alt="Alarme" />
                                                    <p className="descricao"> Faltam: 10 dias!</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="botao_reservar">
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>
                                <div className="card_oferta">
                                    <div className="caixa_imagem">
                                        <img className="imgproduto" src={Produto}
                                            alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                    <img src="imagens/alarm-clock.png" alt="Alarme" />
                                                    <p className="descricao"> Faltam: 10 dias!</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="botao_reservar">
                                        <a href="#" className="btn_reservar">RESERVAR</a>
                                    </div>
                                </div>



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
