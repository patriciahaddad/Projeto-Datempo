import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Produto from '../../assets/imagens/arroz.png';
import api from '../../services/api';
class Mostruario extends Component{

    constructor(){
        super()

        this.state ={
            listaOferta : [],
            listaCategoria: [],

        
            postCategoria : {
                idCategoria: "",
                nomeCategoria: "" 
            }
           
        }
    }

    componentDidMount(){
        this.getCategoria();
       
    }
    

    getCategoria = () => {
        api.get('/categoria')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaCategoria : response.data })
            }
        })
    }

    render(){

        return(
            <div>
                <Header/>
            <main>
            
                <div className="banner_mostruario"></div>
                
                <h2>OFERTAS</h2>
                <hr/>

                <section className="filtro">
                    <div className="container_filtro">
                        <div className="categoria_filtro">
                            <label>Categoria:</label>
                            <select name="categoria" id="cmbCategoria">
                                {
                                    this.state.listaCategoria.map(function (c){
                                        return(
                                            <option
                                                key={c.idCategoria}
                                                value = {c.idCategoria}
                                            >
                                                {c.nomeCategoria}
                                                </option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="categoria_filtro">
                            <label>Ordernar:</label>
                            <select name="relevantes" id="cmbRelevante">
                                <option value="maisRelevantes">Mais relevantes</option>
                                <option value="menorPreco">Menor Preço</option>
                                <option value="maiorPreco">Maior Preço</option>
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

                <p className="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p>
                <section className="produtos">
                    <div className="container">
                        <div className="container_ofertas">

                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>

                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div className="card_oferta">
                                <div className="caixa_imagem">
                                    <img className="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
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
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p className="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="botao_reservar">
                                    <a href="#" className="btn_reservar">RESERVAR</a>
                                </div>
                            </div>



                        </div>
                        <div className="paginacao_ofertas">
                            <ul className="lista_paginacao">
                                <a href="#" clas="lk_paginacao">
                                    <li>  </li>
                                </a> <a href="#">
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
                                    <li>></li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        <Footer/>
        </div>

        );
    }

}
export default Mostruario;
