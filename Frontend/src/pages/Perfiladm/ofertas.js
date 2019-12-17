import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import Menuadm from '../../components/menuadm/menuadm.js';
import apiFormData from './../../services/apiFormData';
import api from './../../services/api';
import Relogio from '../../assets/imagens/alarm-clock.png';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBAlert} from 'mdbreact';


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
                imagem: "",
                descricao: "",
                idUsuario: "",
                idProduto: "",
            },

            erroMsg: "",
            sucessMsg: "",
            modal: false
        }

        this.postOferta = this.postOferta.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.getCategorias();
        this.getProdutos();
        this.getOfertas();

    }

    openModal = (o) => {
        this.toggle();

        this.setState({ putOferta: o }, () => {
            console.log("PUT", this.state.putOferta);
        });
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

    putSetStateFile = (input) => {
        console.log("Input do putSetState: ", input);

        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.files[0]
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

    putOferta = (event) => {
        event.preventDefault();

        let oferta_id = this.state.putOferta.idOferta;

        let oferta = new FormData();

        console.log("Imagem Oferta Put: ", this.state.putOferta.imagem);

        oferta.set('idOferta', this.state.putOferta.idOferta);
        oferta.set('nomeOferta', this.state.putOferta.nomeOferta);
        oferta.set('marca', this.state.putOferta.marca);
        oferta.set('quantVenda', this.state.putOferta.quantVenda);
        oferta.set('validade', this.state.putOferta.validade);
        oferta.set('preco', this.state.putOferta.preco);
        oferta.set('imagem', this.state.putOferta.imagem.current.files[0], this.state.putOferta.imagem.value);
        oferta.set('descricao', this.state.putOferta.descricao);
        oferta.set('idProduto', this.state.putOferta.idProduto);
        oferta.set('idUsuario', this.state.putOferta.idUsuario);

        apiFormData.put('/oferta/' + oferta_id, oferta)
            .then(() => {
                this.setState({ sucessMsg: "Oferta alterada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar a Oferta!" });
            })

        this.toggle();

        setTimeout(() => {
            this.getOfertas();
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


    ContagemDias = (validade) => {
        var dataAtual = new Date();
        var dataValidade = new Date(validade);
        var localdatevalidade = dataValidade.getDate() + '/' + (dataValidade.getMonth()+1) + '/' + dataValidade.getFullYear() + ' ' + dataValidade.getHours() + ':' + dataValidade.getMinutes();


        var dataDif = ((dataValidade - dataAtual)/(1000*60*60*24)).toFixed(0);

        return dataDif + " dias!";
    }

    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <div className="container">
                    <Menuadm/>
                        <section className="cont_branco">
                            <div className="ofertas_cadastradas">
                                <h2>OFERTAS CADASTRADAS</h2>
                                <hr />
                                <div className="container_card">
                                    {
                                        this.state.listaOfertas.map(
                                            function (o) {
                                                return (
                                                    <div className="card_oferta" key={o.idOferta}>
                                                        <div className="caixa_imagem">
                                                            <img className="imgproduto" src={"https://localhost:5001/imgOferta/" + o.imagem}
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
                                                                        <p className="descricao"> Faltam: {this.ContagemDias(o.validade)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="botoes_oferta">
                                                            <a href="#" className="btn_edita_oferta" onClick={() => this.openModal(o)}>EDITAR</a>
                                                            <a href="#" className="btn_reserva_oferta" onClick={() => this.deleteOferta(o.idOferta)}>EXCLUIR</a>
                                                        </div>
                                                    </div>

                                                )
                                            }.bind(this)
                                        )
                                    }
                                </div>
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                                    <form onSubmit={this.putOferta}>
                                        <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putOferta.nomeOferta}</MDBModalHeader>
                                        <MDBModalBody>
                                            <label
                                                htmlFor="defaultFormContactNameEx"
                                                className="black-text">
                                                Informe o título do produto:</label>
                                            <input
                                                type="text"
                                                id="defaultFormContactNameEx"
                                                className="form-control"
                                                name="nomeOferta"
                                                value={this.state.putOferta.nomeOferta}
                                                onChange={this.putSetState} />
                                            <br />
                                            <label
                                                htmlFor="defaultFormContactEmailEx"
                                                className="black-text">
                                                Informe a Marca:</label>
                                            <input
                                                type="text"
                                                id="defaultFormContactEmailEx"
                                                className="form-control"
                                                name="marca"
                                                value={this.state.putOferta.marca}
                                                onChange={this.putSetState} />
                                            <br />
                                            <label
                                                htmlFor="defaultFormContactSubjectEx"
                                                className="black-text">
                                                Informe Valor:</label>
                                            <input
                                                type="text"
                                                id="defaultFormContactSubjectEx"
                                                className="form-control"
                                                name="preco"
                                                value={this.state.putOferta.preco}
                                                onChange={this.putSetState}
                                            />
                                            <br />
                                            <label
                                                htmlFor="defaultFormContactSubjectEx"
                                                className="black-text">
                                                Validade do produto:</label>
                                            <input
                                                type="text"
                                                id="defaultFormContactSubjectEx"
                                                className="form-control"
                                                name="validade"
                                                value={this.state.putOferta.validade}
                                                onChange={this.putSetState}
                                            />
                                            <br />
                                            <label
                                                htmlFor="defaultFormContactSubjectEx"
                                                className="black-text">
                                                Quantidade para Venda:</label>
                                            <input
                                                type="text"
                                                id="defaultFormContactSubjectEx"
                                                className="form-control"
                                                name="quantVenda"
                                                value={this.state.putOferta.quantVenda}
                                                onChange={this.putSetState}
                                            />
                                            <br />
                                            <label
                                                htmlFor="defaultFormContactMessageEx"
                                                className="black-text">
                                                Informações adicionais</label>
                                            <textarea
                                                type="text"
                                                id="defaultFormContactMessageEx"
                                                className="form-control"
                                                name="descricao"
                                                value={this.state.putOferta.descricao}
                                                onChange={this.putSetState}
                                            /><br />
                                            <input accept="image/*"
                                                className="input_load"
                                                id="icon-button-file"
                                                type="file" name="imagem"
                                                onChange={this.putSetStateFile}
                                                ref={this.state.putOferta.imagem} />
                                        </MDBModalBody>
                                        <MDBModalFooter>
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
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                        </MDBModalFooter>
                                    </form>
                                </MDBModal>

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
