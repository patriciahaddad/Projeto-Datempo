import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CarrinhoComponent from '../../components/Carrinho/CarrinhoComponent'
import api from '../../services/api';
import Alert from 'react-bootstrap/Alert';
import { Link, withRouter } from 'react-router-dom';




class Carrinho extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOferta: [],

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

            modal: false,
            mensagemErro: "",
            mensagemSucesso: ""
        }
    }
    componentDidMount() {
        // console.log(this.state.listaOferta);
        // console.log(this.state.listaCategoria);
        // console.log(this.state.listaFiltrada);
        // console.log(this.state.setStateFiltro);

        // this.getCategoria();
        this.getOferta();

        // console.log("LISTA FILTRADA:" +this.props.location.state.busca);
        // console.log(this.props.location.state.listaFiltrada);
        // this.setState({listaFiltrada : this.props.location.state.listaFiltrada})


    }

    getOferta = (id) => {
        api.get('/oferta' +id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                }
            })
    }

    postReserva = (c) => {
        c.preventDefault();
    
        api.post('/reserva', this.state.postReserva)
          .then(() => {
            this.setState({ mensagemSucesso: "Reserva feita com suceso" });
          })
          .catch(() => {
            this.setState({ mensagemErro: "Não foi possível fazer a Reserva, por favor verifique se a compra é valida" });
          })
        setTimeout(() => {
          this.getOferta();
        }, 1200);
      }


    render() {
        return (
            <div>
                <Header />
                {
                    this.state.mensagemSucesso &&
                    <Alert variant="success" dismissible>
                        <Alert.Heading>Sua reserva foi feita com sucesso!!!</Alert.Heading>
                        <p>
                            {this.state.mensagemSucesso}
                        </p>
                    </Alert>
                }
                <main>
                    <div className="cont_branco">
                        <h2>CARRINHO</h2>
                        <hr />
                        <form onSubmit={this.postReserva}>

                        <div className="container_carrinho">

                            <div key={this.props.idOferta}>
                                <CarrinhoComponent
                                    idOferta={this.props.idOferta}
                                    nomeOferta={this.props.nomeOferta}
                                    validade={this.props.validade}
                                    preco={this.props.preco}
                                    imagem={this.props.imagem}
                                />
                            </div>

                        </div>

                        <div className="botoes_carrinho">
                            <Link to="/mostruario" className="botao_carrinho">Continuar comprando</Link>
                            <button className="btn_carrinho" type="submit">Finalizar reserva</button>
                        </div>
                        
                    </form>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Carrinho;