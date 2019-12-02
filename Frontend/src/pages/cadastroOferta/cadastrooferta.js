import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import arroz from '../../assets/imagens/arroz.jpg';


class cadastroOferta extends Component {
    constructor() {
        super()
        this.state = {
            oferta:{
                //criar propriedades para o produto
                //exemplo
                // titulo: '', valor: ''
            },
            isEdit: true
        }
    }

    componentDidMount() {
        this.getOferta();
    }

    getOferta = () => {
        api.get('/oferta/2').then(response => {
            if (response.status === 200) {
                this.setState({ oferta: response.data })
            }
        })
    }

    insertOferta = event =>{
        event.preventDefault();

        api.post('/oferta/2', { 
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
                                <img src={arroz} alt="Sua imagem de perfil"/>
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
                                    name="validade"
                                    value={this.state.oferta.validade}/></label>

                                <label className="form_label input_vert">Quantidade em estoque
                                    <input type="text" 
                                    placeholder="Informe quantidade em estoque" 
                                    name="quantVenda"
                                    value={this.state.oferta.quantVenda}/></label>

                                <div className="informacoes_adicionais">
                                    <label className="form_label">Informações adicionais
                                        <textarea className="form_adicionais"
                                            placeholder="Digite aqui descrição do produto e Informações adicionais que sejam úteis." 
                                            name="descricao" 
                                            value={this.state.oferta.descricao}> </textarea></label>
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