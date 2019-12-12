import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
// import arroz from '../../assets/imagens/arroz.jpg';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBAlert} from 'mdbreact';

class cadastroOferta extends Component {
    constructor() {
        super()
        this.state = {
            oferta:{
                //criar propriedades para o produto
                //exemplo
                // titulo: '', valor: ''
            },
            listaoferta: [],

            postOferta: {
                nomeOferta: "",
                marca: "",
                preco: null,
                validade: "",
                quantVenda: "",
                imagem: React.createRef(),
                
            },
        }
    }

    componentDidMount() {
        this.getOferta();
    }

    getOferta = () => {
        api.get('/oferta/21').then(response => {
            if (response.status === 200) {
                this.setState({ oferta: response.data })
            }
        })
    }

    insertOferta = event =>{
        event.preventDefault();

        api.put('/oferta/21', { 
        }).then(response => {
            if(response.status === 200) {
                console.log('Deu certo');
            }else {
                console.log('Deu ERRADO');
            }
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <div className="cont_branco">
                        <h2>CADASTRO DE OFERTAS</h2>
                        <hr/>
                        <form className="formulario-cad" onSubmit="">
                            <div className="produtos-cadastos">
                                <img src="imagens/arroz.jpg" alt="Sua imagem de perfil"/>
                            </div>
                            <div className="form-cad">
                                <label className="form_label input_horizontal">Informe o título do produto
                                    <input type="text" 
                                    placeholder="Ex: Arroz" 
                                    name="nomeOferta"
                                    value={this.state.oferta.nomeOferta}/> </label>

                                <label className="form_label input_vert">Informe Marca
                                    <input type="text" 
                                    placeholder="Ex:Tio João" 
                                    name="marca"
                                    value={this.state.oferta.marca}/></label>

                                <label className="form_label input_vert">Informe Valor
                                    <input type="text" 
                                    placeholder="10,00" 
                                    name="preco"
                                    value={this.state.oferta.preco}/></label>

                                <label className="form_label input_vert">Validade do produto
                                    <input type="text" 
                                    placeholder="05/09/2019" 
                                    name="validade"/></label>

                                <label className="form_label input_vert">Quantidade em estoque
                                    <input type="text" 
                                    placeholder="Informe quantidade em estoque" 
                                    name="quantVenda"/></label>

                                <div className="informacoes_adicionais">
                                    <label className="form_label">Informações adicionais
                                        <textarea className="form_adicionais"
                                            placeholder="Digite aqui descrição do produto e Informações adicionais que sejam úteis." 
                                            name="descricao"> </textarea></label>
                                </div>
                                
                                <div className="position-right">
                                    <button type="submit">SALVAR</button>
                                </div>
                            <hr />

                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="6">
                                    <form onSubmit={this.postOferta}>
                                        <label htmlFor="defaultFormContactNameEx" className="black-text">
                                            Título da Oferta</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Arroz"
                                            id="defaultFormContactNameEx"
                                            className="form-control"
                                            name="nomeOferta"
                                            value={this.state.postOferta.nomeOferta}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label htmlFor="defaultFormContactEmailEx" className="black-text">
                                            Marca do produto:</label>
                                        <input
                                            type="text"
                                            placeholder="marca"
                                            id="defaultFormContactEmailEx"
                                            className="form-control"
                                            name="marca"
                                            value={this.state.postOferta.marca}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Preço:</label>
                                        <input
                                            type="text"
                                            placeholder="10,00"
                                            id="defaultFormContactSubjectEx"
                                            className="form-control"
                                            name="preco"
                                            value={this.state.postOferta.preco}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Validade:</label>
                                        <input
                                            type="text"
                                            placeholder="05/09/2019"
                                            id="defaultFormContactSubjectEx"
                                            className="form-control"
                                            name="validade"
                                            value={this.state.postOferta.validade}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Quantidade para venda:</label>
                                        <input
                                            type="text"
                                            placeholder="2..."
                                            id="defaultFormContactSubjectEx"
                                            className="form-control"
                                            name="quantVenda"
                                            value={this.state.postOferta.quantVenda}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactMessageEx"
                                            className="black-text">
                                            Informações adicionais</label>
                                        <textarea
                                            type="text"
                                            id="defaultFormContactMessageEx"
                                            className="form-control"
                                            name="descricao"
                                            value={this.state.postOferta.descricao}
                                            onChange={this.postSetState}
                                        /><br/>
                                         <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Tipo de Produto:</label>
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Imagem do produto:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="imagem"
                                            //value={this.state.postOferta.imagem}
                                            ref={this.state.postOferta.imagem}
                                        /><br />
                                        <div className="text-center mt-4">
                                            <MDBBtn color="amber" outline type="submit">
                                                Cadastrar
                                            <MDBIcon far icon="paper-plane" className="ml-2" />
                                            </MDBBtn>
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
                                            
                                        </div>
                                    </form>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                    </form>
                    </div>
                </main>
                <Footer></Footer>
            </div>
            
        );
    }
}


export default cadastroOferta;
