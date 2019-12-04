import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from './../../services/api';
import Relogio from '../../assets/imagens/alarm-clock.png';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBAlert } from 'mdbreact';




class Ofertas extends Component {

    constructor() {
        super()
        this.state = {

            listaCategorias: [],
            listaProdutos: [],
            listaOfertas: [],

            postOferta: {
                nomeOferta: "",
                marca: "",
                quantVenda: "",
                validade: "",
                preco: "",
                imagem: React.createRef(),
                descricao: "",
                idUsuario: "",
                idProduto: "",
            },

            putOferta: {
                idOferta: "",
                nomeOferta: "",
                marca: "",
                quantVenda: "",
                validade: "",
                preco: "",
                imagem: React.createRef(),
                descricao: "",
                idUsuario: "",
                idProduto: "",
            },

            erroMsg: "",
            sucessMsg: "",
            modal4: false
        }

        this.postOferta = this.postOferta.bind(this);
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    componentDidMount() {
        this.getCategorias();
        this.getProdutos();
        this.getOfertas();
    }

    openModalCategoria = (c) => {
        this.toggle();

        this.setState({ getCategoria: c });
        console.log("GET", this.state.getCategoria);
    }

    openModalEditarCategoria = (c) => {
        this.toggle();

        this.setState({ putCategoria: c });
        console.log("PUT", this.state.putCategoria);
    }

    //#region GET

    getCategorias = () => {
        api.get('/categoria')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaCategorias: response.data })
                }
            })
    }

    getProdutos = () => {
        api.get('/produto')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProdutos: response.data })
                }
            })
    }

    getOfertas = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOfertas: response.data })
                }
            })
    }
    //#endregion

    //#region PUT

    putSetState = (input) => {
        this.setState({
            putProduto: {
                ...this.state.putProduto, [input.target.name]: input.target.value
            }
        })
    }

    putProduto = (event) => {
        event.preventDefault();
        let produto_id = this.state.putProduto.idProduto;
        let produto_alterado = this.state.putProduto;

        api.put('/produto/' + produto_id, produto_alterado)
            .then(() => {
                this.setState({ sucessMsg: "Oferta alterada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar a Oferta!" });
            })

        this.toggle();

        setTimeout(() => {
            this.getProdutos();
        }, 1500);
    }

    //#endregion

    //#region POSTs
    postSetState = (input) => {
        this.setState({
            postOferta: {
                ...this.state.postOferta, [input.target.name]: input.target.value
            }
        })
    }

    postOferta = (o) => {
        o.preventDefault();

        let oferta = new FormData();

        oferta.set("nomeOferta", this.state.postOferta.nomeOferta);
        oferta.set('marca', this.state.postOferta.marca);
        oferta.set('quantVenda', this.state.postOferta.quantVenda);
        oferta.set('validade', this.state.postOferta.validade);
        oferta.set('preco', this.state.postOferta.preco);
        oferta.set('imagem', this.state.postOferta.imagem.current.files[0]);
        oferta.set('descricao', this.state.postOferta.descricao);
        oferta.set('idUsuario', this.state.postOferta.idUsuario);
        oferta.set('idProduto', this.state.postOferta.idProduto);

        fetch('http://localhost:5000/api/oferta', {
            method: "POST",
            body: oferta,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.getOfertas();
            })
            .catch(error => console.log('Não foi possível cadastrar:' + error))
    }

    //#endregion

    //#region DELETE

    deleteOferta = (id) => {

        this.setState({ sucessMsg: " " })

        api.delete('/oferta/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ sucessMsg: "Excluído com sucesso!" })
                    setTimeout(() => {
                        this.getOfertas();
                    }, 1000);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao excluir!" })
            })
    }

    //#endregion

    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <div className="container">
                        <section className="cont_branco">
                            <div className="ofertas_cadastradas">
                                <h2>OFERTAS CADASTRADAS</h2>
                                <hr />
                                <div className="container_cadastrar">
                                    <MDBBtn color="primary" onClick={this.toggle(4)}>CADASTRAR</MDBBtn>
                                    <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                            <form className="formulario-cad_modal" onSubmit={this.postOferta}>
                                        <MDBModalHeader toggle={this.toggle(4)}>Cadastrar nova oferta</MDBModalHeader>
                                        <MDBModalBody>

                                                <input type="file" 
                                                       name="imagem"
                                                       value={this.state.listaOfertas.nomeOferta}
                                                       onChange={this.postSetState}
                                                       ref={this.state.fileInput}/>

                                                <label className="form_label">Informe o título do produto
                                                    <input type="text"  
                                                           name="nomeOferta" 
                                                           value={this.state.listaOfertas.nomeOferta}
                                                           onChange={this.postSetState}/></label>

                                                <label className="form_label">Informe Marca
                                                    <input type="text"
                                                           name="marca"
                                                           value={this.state.listaOfertas.marca}
                                                           onChange={this.postSetState} /></label>

                                                <label className="form_label">Informe Valor
                                                    <input type="text"
                                                           name="preco"
                                                           value={this.state.listaOfertas.preco}
                                                           onChange={this.postSetState} /></label>

                                                <label className="form_label">Validade do produto
                                                    <input type="date" 
                                                           name="validade"
                                                           value={this.state.listaOfertas.validade}
                                                           onChange={this.postSetState}/></label>

                                                <label className="form_labelt">Quantidade em estoque
                                                    <input type="number"
                                                           name="quantVenda"
                                                           value={this.state.listaOfertas.quantVenda}
                                                           onChange={this.postSetState}/></label>

                                                <label className="form_label">Informações adicionais
                                                     <textarea className="form_adicionais" 
                                                               name="descricao"
                                                               value={this.state.listaOfertas.descricao}
                                                               onChange={this.postSetState}> </textarea></label>
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle(4)}>Fechar</MDBBtn>
                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                            {
                                                    this.state.erroMsg &&
                                                    <MDBAlert color="danger" >
                                                        {this.state.erroMsg}
                                                    </MDBAlert>
                                                }
                                                {
                                                    this.state.sucessMsg &&
                                                    <MDBAlert color="sucess" >
                                                        {this.state.sucessMsg}
                                                    </MDBAlert>
                                                }
                                        </MDBModalFooter>
                                            </form>
                                    </MDBModal>
                                </div>
                                <div className="container_card">
                                    { 
                                        this.state.listaOfertas.map(
                                            function (o) {
                                                return (
                                                    <div className="card_oferta">
                                                        <div className="caixa_imagem">
                                                            <img className="imgproduto" src={"../../assets/imgOferta/" + o.imagem}
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
                                                                    <p className="preco_descricao">{o.preco.toFixed(2)}</p>
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
                                                        <div className="botoes_oferta">
                                                            <a href="#" className="btn_edita_oferta">EDITAR</a>
                                                            <a href="#" className="btn_reserva_oferta" onClick={() => this.deleteOferta(o.idOferta)}>EXCLUIR</a>
                                                        </div>
                                                    </div>

                                                )
                                            }.bind(this)
                                        )
                                    }

                                </div>
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
                        </section>
                    </div>
                </main>
                <Footer></Footer>
            </div >
        );
    }
}

export default Ofertas;
