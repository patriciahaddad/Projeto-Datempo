import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import api from '../../services/api';

import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput
} from 'mdbreact';

import Produto from '../../assets/imagens/arroz.png';
import Relogio from '../../assets/imagens/alarm-clock.png';


class Minhasofertas extends Component {
    constructor() {
        super()
        this.state = {
            listaOfertas: [],

            putOferta: {
                idOferta: "",
                nomeOferta: "",
                marca: "",
                quantVenda: "",
                validade: "",
                preco: "",
                imagem: React.createRef(), // 01 - Colocamos o createRef
                descricao: "",
                idUsuario: "",
                idProduto: "",
            },

            modal: false,
            erroMsg : "",
            successMsg : ""
        }

    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }      

    componentDidMount() {
        this.getOfertas();
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

    getOfertas = (idOferta) => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOfertas: response.data })
                }
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

    //#region PUT
    //atualiza input do modal
    putSetState = (input) => {
        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.value
            }
        })
    }

    // 02 - Adicionar um setState específico
    putSetStateFile = (input) =>{
        this.setState({
            putOferta : {
                ...this.state.putOferta, [input.target.name] : input.target.files[0]
            }
        })
    }

    putOferta = (event) => {
        event.preventDefault();

        let oferta_id = this.state.putOferta.idOferta;
        let oferta_alterado= this.state.putOferta;

        console.log(oferta_id)
        console.log(oferta_alterado)

        // 03 - Criamos nosso formData
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

        // 04 - Nesta parte está o segredo, precisamos de 3 parâmetros
        // Veja no exemplo dado na documentação 
        // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData/set
        formData.set('imagem', this.state.putOferta.imagem.current.files[0] , this.state.putOferta.imagem);

        console.log(formData);

        // 05 - Não esqueça de passar o formData
        api.FormData.put('/oferta/' + oferta_id, formData)
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
        

    deleteOferta(id){

        this.setState({ successMsg : "" })

        api.delete('/minhasofertas/'+id)
        .then(response => {
            if(response.status === 200){
                this.setState({ successMsg : "Excluído com sucesso" })

                setTimeout(() => {
                    this.getOfertas();
                }, 1500);
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Falha ao excluir" })
        }) 
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
                            <div className="filtro">
                                <div className="filtros">
                                    <MDBBtn className="btn_cria_Oferta">Cadastrar oferta</MDBBtn>
                                    <MDBBtn className="btn-filtro">Selecione por:</MDBBtn>
                                    
                                </div>
                            </div>
                            <p className="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p>
                        </div>

                        {
                            this.state.listaOfertas.map(function (o) {
                                return (
                                    <div className="card_oferta" key={o.idOferta}>
                                        <div className="caixa_imagem">
                                            <img src={"https://localhost:5000/api/oferta" + o.imagem} 
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
                                            <MDBBtn color="primary" size="sm" onClick={() => this.openModal(o)}>
                                                EDITAR
                                            </MDBBtn>

                                            <MDBBtn color="danger" size="sm" onClick={() => this.openModalReservaOferta(o)}>
                                                RESERVAS
                                            </MDBBtn>
                                        </div>
                                    </div>
                                )
                            }.bind(this))
                        }

                            {/* Modal Editar Oferta */}
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg">
                                <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putOferta.nomeOferta} </MDBModalHeader>
                                <form className="formulario-cad_modal" onSubmit={this.putOferta}>
                                    <MDBModalBody>
                                        {/* <input type="image" name="imagem" value={this.state.putOferta.imagem} onChange={this.putSetState}/> */}
                                        
                                           
                                            {/* <input placeholder="Placeholder" type="text" id="form5" class="form-control"> 
                                            <label for="form5">Example label</label> */}

                                            <MDBInput name="nomeOferta" value={this.state.putOferta.nomeOferta} onChange={this.putSetState}/>
                                        
                                            <MDBInput name="marca" value={this.state.putOferta.marca} onChange={this.putSetState} />
                                        
                                            <MDBInput name="preco" value={this.state.putOferta.preco} onChange={this.putSetState}/>
                                            <MDBInput name="validade" value={this.state.putOferta.validade} onChange={this.putSetState}/>
                                        
                                            <MDBInput name="quantVenda" value={this.state.putOferta.quantVenda} onChange={this.putSetState}/>
                                       
                                            <textarea className="form_adicionais" name="descricao" value={this.state.putOferta.descricao} onChange={this.putSetState}> </textarea>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                        <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        <MDBBtn color="danger" onClick={this.state.deleteOferta} type="submit">Excluir</MDBBtn>
                                        
                                    </MDBModalFooter>
                                </form>
                            </MDBModal>

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
            </div >
        );
    }
}

export default Minhasofertas;
