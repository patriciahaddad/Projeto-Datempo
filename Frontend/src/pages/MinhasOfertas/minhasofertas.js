import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from '../../services/api';
import apiFormData from '../../services/apiFormData';

import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBAlert
} from 'mdbreact';

import Relogio from '../../assets/imagens/alarm-clock.png';
import { Link } from 'react-router-dom';

class Minhasofertas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOfertas: [],
            idOferta : this.props.idOferta,

            listaReservaOferta: [],
            listaCategoria: [],
            listaFiltro: [],
            listaFiltrada: [],


            putOferta: {
                idOferta: "",
                nomeOferta: "",
                marca: "",
                quantVenda: "",
                validade: "",
                preco: "",
                imagem: React.createRef(), // Colocamos o createRef
                descricao: "",
                idUsuario: "",
                idProduto: "",
            },

            modal: false,
            erroMsg: "",
            successMsg: "",

            dataAtual: "",

            setStateFiltro: "",
            setStateTodos: "",
        }

    }

    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({idOferta : this.props.idOferta})
        }, 100);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.getOfertas();
        this.getCategoria();
    
    }

    openModal = (o) => {
        this.toggle();

        this.setState({ putOferta: o });
        console.log("PUT", this.state.putOferta);
    }

    openPagina = (o) => {
        this.toggle();

        this.setState({ putOferta: o });
        console.log("PUT", this.state.putOferta);
    }

    //Método para filtrar a categoria
    getFiltro = () => {
        // if (this.atualizaSelect.value === "Todos") {
        //     console.log(this.getOferta)
        // }else

        api.get('/filtro/filtrarcategoria/' + this.state.setStateFiltro)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOfertas: response.data });
                }
            })

    }

   
    //Atualiza o estado do valor do select
    atualizaSelect = (value) => {
        (value === "Todos") ? setTimeout(() => {
            this.getOfertas()
        }, 1000) :
        this.setState({ setStateFiltro: value })
        setTimeout(() => {
            this.getFiltro(this.state.filtro)
        }, 1000);
    }

    getOfertas = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOfertas: response.data })
                }
            })
    }

    getCategoria = () => {
        api.get('/categoria')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaCategoria: response.data });
                }
            })
    }

    getReservaOferta = (reserva) => {

        let id = this.props.location.state.reserva;

        api.get('/reserva')

            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaReservaOferta: [response.data] });
                    console.log(response.data)
                }
            })
    }

    //#region PUT
    //atualiza input do modal
    putSetState = (input) => {
        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.value
            }
        })
    }

    // Adicionar um setState específico
    putSetStateFile = (input) => {
        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.files[0]
            }
        })
    }

    putOferta = (event) => {
        event.preventDefault();

        let oferta_id = this.state.putOferta.idOferta;

        let formData = new FormData();
        formData.set('idOferta',this.state.putOferta.idOferta);
        formData.set('nomeOferta',this.state.putOferta.nomeOferta);
        formData.set('marca',this.state.putOferta.marca);
        formData.set('quantVenda',this.state.putOferta.quantVenda); 
        formData.set('validade',this.state.putOferta.validade); 
        formData.set('preco',this.state.putOferta.preco);  
        formData.set('descricao',this.state.putOferta.descricao);  
        formData.set('idUsuario',this.state.putOferta.idUsuario);  
        formData.set('idProduto',this.state.putOferta.idProduto);  

        // Veja no exemplo dado na documentação 
        // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData/set
        formData.set('imagem', this.state.putOferta.imagem.current.files[0] , this.state.putOferta.imagem);

        console.log(formData);

        // Não esqueça de passar o formData
        apiFormData.put('/oferta/' + oferta_id, formData)
        .then(() => {
            this.setState({ sucessMsg: "Oferta alterada com sucesso!" });
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg: "Falha ao alterar Oferta!" });
        })
        this.toggle();

        setTimeout(() => {
            this.getOfertas();
        }, 1500);
    }


    deleteOferta = (id) => {


        this.setState({ successMsg: "" })

        api.delete('/oferta/'+ id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: "Excluído com sucesso" })

                    setTimeout(() => {
                        this.getOfertas();
                    }, 1500);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao excluir" })
            })
    }

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
                <Header />
                <main>
                    <div className="cont_branco">
                        <div className="ofertas_cadastradas">
                            <h2>MINHAS OFERTAS</h2>
                            <hr />
                            <section className="filtro">

                            <div className="filtro">
                                <div className="filtros">
                                    {/* <MDBBtn className="btn_cria_Oferta">Cadastrar oferta</MDBBtn> */}
                                    <Link className="link" to={{ pathname: "/ofertas" }} >Cadastrar oferta</Link>

                                    {/* <MDBBtn className="btn-filtro">Selecione por:</MDBBtn> */}
                                </div>
                            </div>

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
                                        })
                                    }
                                </select>
                            </div>
                    </section> 
                            {/* <p className="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p> */}
                        </div>
                        <div className="container_card">
                        {
                            this.state.listaOfertas.map(function (o) {
                                return (
                                    <div className="card_oferta" key={o.idOferta}>
                                        <div className="caixa_imagem">
                                            <img src={"http://localhost:5000/imgOferta/" + o.imagem}
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
                                                    <p className="preco_descricao">R$ { o.preco.toFixed(2)}</p>
                                                </div>

                                                <div className="descricao_pequena_logo">
                                                    <p className="titulo_descricao_logo">DATEMPO</p>
                                                    <div className="validade_mostruario">
                                                        <img src={Relogio} alt="Alarme" />
                                                        <p className="descricao"> Faltam: {this.ContagemDias(this.props.validade)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="botao_reservar">
                                            <button className="btn_editar" onClick={() => this.openModal(o)}>
                                                EDITAR
                                            </button>
                                            <button className="btn_excluir" onClick={() => this.deleteOferta(o.idOferta)}>EXCLUIR</button>                                            
                                            
                                        </div>
                                         {/* <MDBBtn className="btn_reserva" color="purple" size="sm"> reservas </MDBBtn> */}
                                         <Link className="link_reserva" to={{ pathname: '/reservas', state: { reserva: o.reserva } }}> RESERVAS </Link>
                                        </div>
                                )
                            }.bind(this))
                        }
                         </div>
                        {/* Modal Editar Oferta */}
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                            <form className="formulario-cad_modal" onSubmit={this.putOferta}>
                            <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putOferta.nomeOferta} </MDBModalHeader>
                                <MDBModalBody>
                                    
                                    <input accept="image/*"
                                              name="imagem" 
                                              type="file" 
                                              onChange={this.putSetStateFile} 
                                              ref={this.state.putOferta.imagem}/>
                                    <br/>
                                    <br/>
                                    <label
                                        htmlFor= 'defaultFormContactNameEx'
                                        className= "black-text">
                                        Nome do Produto:
                                    </label>
                                    <input name="nomeOferta" 
                                              type= 'text'
                                              id="defaultFormContactNameEx"
                                              className="form-control"
                                              value={this.state.putOferta.nomeOferta} 
                                              onChange={this.putSetState} />

                                    <br/>
                                    <label
                                        htmlFor= 'defaultFormContactNameEx'
                                        className= "black-text">
                                        Marca:
                                    </label>
                                    <input name="marca" 
                                              type= 'text'
                                              id="defaultFormContactNameEx"
                                              className="form-control"
                                              value={this.state.putOferta.marca} 
                                              onChange={this.putSetState} />
                                        
                                    <br/>
                                    <label
                                        htmlFor= 'defaultFormContactNameEx'
                                        className= "black-text">
                                        Preço:
                                    </label>
                                    <input name="preco" 
                                              type= 'text'
                                              id="defaultFormContactNameEx"
                                              className="form-control"
                                              value={this.state.putOferta.preco} 
                                              onChange={this.putSetState} />
                                    <br/>
                                    
                                    <label
                                        htmlFor= 'defaultFormContactNameEx'
                                        className= "black-text">
                                        Validade:
                                    </label>
                                    <input name="validade" 
                                              type= 'date'
                                              id="defaultFormContactNameEx"
                                              className="form-control"
                                              value={this.state.putOferta.validade} 
                                              onChange={this.putSetState} />
                                    <br/>                                    
                                    <label
                                        htmlFor= 'defaultFormContactNameEx'
                                        className= "black-text">
                                        Quantidade de itens para venda:
                                    </label>
                                    <input name="quantVenda" 
                                              type= 'text'
                                              id="defaultFormContactNameEx"
                                              className="form-control"
                                              value={this.state.putOferta.quantVenda} 
                                              onChange={this.putSetState} />
                                    <br/>
                                    <label
                                        htmlFor= 'defaultFormContactNameEx'
                                        className= "black-text">
                                        Descrição:
                                    </label>
                                    <br/>
                                    <textarea className="form_adicionais" 
                                              name="descricao" 
                                              value={this.state.putOferta.descricao} 
                                              onChange={this.putSetState}> </textarea>                                          
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="primary" type="submit">Salvar </MDBBtn>
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
                                    <MDBBtn color="terciary" onClick={this.toggle}>Fechar</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBModal>

                    </div>
                </main>


            <Footer />
            </div >
        );
    }
}

export default Minhasofertas;