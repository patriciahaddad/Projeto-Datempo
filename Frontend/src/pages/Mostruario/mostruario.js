import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import CardOferta from '../../components/CardOferta/cardOferta';
import Carrinho from '../../components/Carrinho/CarrinhoComponent';


import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView
} from
    "mdbreact";

class Mostruario extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listaOferta: [],
            listaCategoria: [],
            listaFiltro: [],
            listaFiltroOrdenacao: [],

            //Responsavel por buscar do header a lista filtrada 
            filtro: "",

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

            setStateFiltro: "",
            setStateOrdenacao: "",
            // setStateTodos: "",

            modal: false

        }
    }
    componentDidMount() {
        this.getCategoria();

        if(this.props.location.state != null) {
            setTimeout(() => {
                this.setState({
                    listaOferta : this.props.location.state.filtroBusca
                  })
                  console.log("Termo", this.state.listaOferta)

            }, 1000)
        } else {
            this.getOferta();
        }  
      }
    UNSAFE_componentWillReceiveProps(){
        if(this.props.location.state != null) {
            setTimeout(() => {
                this.setState({
                    listaOferta : this.props.location.state.filtroBusca
                  })
                  console.log("Termo", this.state.listaOferta)

            }, 1000)
        } else {
            this.getOferta();
        }  
      }


    componentDidUpdate() {
        console.log("Update");

    }

    //#region Get 
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

    getOrdenar = () => {
        api.get('/filtro/OrdenarPreco/' + this.state.value)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                    console.log(response)
                }
            })
    }
    //Atualiza o estado do valor do select
    atualizaSelect = (value) => {
        (value === "Todos") ? setTimeout(() => {
            this.getOferta()
        }, 1000) :
            this.setState({ setStateFiltro: value })
        setTimeout(() => {
            this.getFiltro(this.state.filtro)
        }, 1000);
    }

    atualizaSelectOrdenacao = (value) => {

        (value === "Menor")
            ?
            setTimeout(() => {
                this.getOrdenar(this.state.value)
            }, 1000)
            :
            // this.setState({ setStateFiltroOrdenacao: value })

            (value === "Maior") ?
                setTimeout(() => {
                    this.getOrdenar(this.state.filtro)
                    console.log("maior")
                }, 1000)
                :
                setTimeout(() => {
                    this.getOrdenar(this.state.filtro)
                }, 1000)
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <MDBCarousel
                    activeItem={1}
                    length={3}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-1">
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
                <main>
                    <h2>OFERTAS</h2>
                    <hr />
                    <section className="filtro">
                        <div className="container_filtro">
                            <div className="categoria_filtro">
                                <label>Categoria:</label>
                                <select name="idCategoria" id="cmbCategoria"
                                    onChange={(e) => this.atualizaSelect(e.target.value)}
                                >

                                    <option value="Todos"> Todos </option>

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
                                <select name="relevantes" id="cmbRelevante"
                                    onChange={(e) => this.atualizaSelectOrdenacao(e.target.value)}>
                                    <option value="maisRelevantes">Mais relevantes</option>
                                    <option value="Menor">Menor Preço</option>
                                    <option value="Maior" >Maior Preço</option>
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
                    <section className="produtos">
                        <div className="container">
                            <div className="container_ofertas">
                                {

                                    this.state.listaOferta.map(function (o) {
                                        return (
                                            <div key={o.idOferta}>
                                                <CardOferta
                                                    idOferta={o.idOferta}
                                                    nomeOferta={o.nomeOferta}
                                                    validade={o.validade}
                                                    preco={o.preco.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 3 })}
                                                    imagem={o.imagem}
                                                    descricao={o.descricao}
                                                />
                                            </div>
                                        )
                                    }
                                    )
                                }

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
