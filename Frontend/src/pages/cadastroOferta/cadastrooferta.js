import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import arroz from '../../assets/imagens/arroz.jpg';


class cadastroOferta extends Component {

    render() {

        return (
            <div>
                <Header></Header>
                <main>
                    <div className="cont_branco">
                        <h2>CADASTRO DE OFERTAS</h2>
                        <hr/>
                        <form className="formulario-cad">
                            <div className="produtos-cadastos">
                                <img src="imagens/arroz.jpg" alt="Sua imagem de perfil"/>
                            </div>
                            <div className="form-cad">
                                <label className="form_label input_horizontal">Informe o título do produto
                                    <input type="text" placeholder="Ex: Arroz"/> </label>

                                <label className="form_label input_vert">Informe Valor
                                    <input type="text" placeholder="10,00"/></label>

                                <label className="form_label input_vert">Validade do produto
                                    <input type="text" placeholder="05/09/2019"/></label>

                                <label className="form_label input_vert">Quantidade em estoque
                                    <input type="text" placeholder="Informe quantidade em estoque"/></label>

                                <div className="informacoes_adicionais">
                                    <label className="form_label">Informações adicionais
                                        <textarea className="form_adicionais"
                                            placeholder="Digite aqui descrição do produto e Informações adicionais que sejam úteis."> </textarea></label>
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