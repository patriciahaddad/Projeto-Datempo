import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';


class cadastroOferta extends Component {
    constructor(props) {
        super(props)
        this.state = {

            listaoferta: [],

            postOferta: {
                nomeOferta: "",
                marca: "",
                preco: null,
                validade: "",
                quantVenda: "",
                imagem: React.createRef(),
            },
            isEdit: true
        }
    }

    getOferta = () => {
        api.get('/oferta').then(response => {
            if (response.status === 200) {
                this.setState({ listaoferta: response.data })
            }
        })
    }

    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    postSetState = (input) => {
        this.setState({
            postOferta: {
                ...this.state.postOferta,
                [input.target.name]: input.target.value
            }
        })
    }

    postOferta = (e) => {

        e.preventDefault();

        console.log(this.state.postOferta)

        let oferta = new FormData();

        oferta.set("nomeOferta", this.state.postOferta.nomeOferta);
        oferta.set("marca", this.state.postOferta.marca);
        oferta.set("preco", this.state.postOferta.preco);
        oferta.set("validade", this.state.postOferta.validade);
        oferta.set("quantVenda", this.state.postOferta.quantVenda);
        oferta.set("imagem", this.state.postOferta.imagem.current.files[0]);

        console.log(oferta);

        fetch('http://localhost:5000/api/oferta', {
            method: "POST",
            body: oferta,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.getOferta();
            })
            .catch(error => console.log('Não foi possível cadastrar:' + error));
    }

    render() {

        return (
            <div>
                <Header />
                <main>
                    <div className="cont_branco">
                        <h2>CADASTRO DE OFERTAS</h2>
                        <hr />
                        <form className="formulario-cad" onSubmit={this.postOferta}>
                            <div className="produtos-cadastos">
                                <input
                                    type="file"
                                    name="imagem"
                                    alt="Sua imagem de perfil"
                                    ref={this.state.postOferta.imagem} />
                            </div>
                            <div className="form-cad">
                                <label className="form_label input_horizontal">Informe o título do produto
                                    <input
                                        type="text"
                                        placeholder="Ex: Arroz"
                                        name="nomeOferta"
                                        value={this.state.postOferta.nomeOferta}
                                        onChange={this.postSetState} /> </label>

                                <label className="form_label input_vert">Informe Marca
                                    <input
                                        type="text"
                                        placeholder="Ex:Tio João"
                                        name="marca"
                                        value={this.state.postOferta.marca}
                                        onChange={this.postSetState} /></label>

                                <label className="form_label input_vert">Informe Valor
                                    <input
                                        type="text"
                                        placeholder="10,00"
                                        name="preco"
                                        value={this.state.postOferta.preco}
                                        onChange={this.postSetState} /></label>

                                <label className="form_label input_vert">Validade do produto
                                    <input
                                        type="string"
                                        placeholder="05/09/2019"
                                        name="validade"
                                        value={this.state.postOferta.validade}
                                        onChange={this.postSetState}
                                    /></label>

                                <label className="form_label input_vert">Quantidade em estoque
                                    <input
                                        type="number"
                                        placeholder="Informe quantidade em estoque"
                                        name="quantVenda"
                                        value={this.state.postOferta.quantVenda}
                                        onChange={this.postSetState} /></label>

                                <div className="informacoes_adicionais">
                                    <label className="form_label">Informações adicionais
                                        <textarea
                                            className="form_adicionais"
                                            placeholder="Digite aqui descrição do produto e Informações adicionais que sejam úteis."
                                            name="descricao"
                                            value={this.state.postOferta.descricao}
                                            onChange={this.postSetState} />
                                    </label>
                                </div>

                                <div className="position-right">
                                    <button type="submit">SALVAR</button>
                                </div>

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