import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Produto from '../../assets/imagens/arroz.png';

class Mostruario extends Component{

    render(){

        return(
            <div>
                <Header/>
            <main>
            
                <div class="banner_mostruario"></div>
                
                <h2>OFERTAS</h2>
                <hr/>

                <section class="filtro">
                    <div class="container_filtro">
                        <div class="categoria_filtro">
                            <label>Categoria:</label>
                            <select name="categoria" id="cmbCategoria">
                                <option>Alimentos</option>
                                <option value="pereciveis">Pereciveis</option>
                                <option value="legumes">Legumes</option>
                                <option value="frutas">Frutas</option>
                            </select>
                        </div>
                        <div class="categoria_filtro">
                            <label>Ordernar:</label>
                            <select name="relevantes" id="cmbRelevante">
                                <option value="maisRelevantes">Mais relevantes</option>
                                <option value="menorPreco">Menor Preço</option>
                                <option value="maiorPreco">Maior Preço</option>
                            </select>
                        </div>
                        <div class="categoria_filtro">
                            <label>Produtos na Página:</label>
                            <select name="qntProdutos" id="cmbRelevante">
                                <option value="quinzeProdutos">12 Produtos</option>
                                <option value="trintaProdutos">24 Produtos</option>
                                <option value="quarentaProdutos">36 Produtos</option>
                            </select>
                        </div>
                        </div>
                </section>

                <p class="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p>
                <section class="produtos">
                    <div class="container">
                        <div class="container_ofertas">

                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>

                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>
                            <div class="card_oferta">
                                <div class="caixa_imagem">
                                    <img class="imgproduto" src={Produto}
                                        alt="Pacote de Arroz de 5kg da marca Tio João"/>
                                </div>
                                <div class="descricao_oferta">
                                    <div class="titulo_produto">
                                        <p class="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                    <div class="descricao_produto">
                                        <div class="descricao_pequena">
                                            <p class="titulo_descricao">de R$ 8,00</p>
                                            <p class="titulo_preco">Por</p>
                                            <p class="preco_descricao">R$ 5,00</p>
                                        </div>

                                        <div class="descricao_pequena_logo">
                                            <p class="titulo_descricao_logo">DATEMPO</p>
                                            <div class="validade_mostruario">
                                                <img src="imagens/alarm-clock.png" alt="Alarme"/>
                                                <p class="descricao"> Faltam: 10 dias!</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="botao_reservar">
                                    <a href="#" class="btn_reservar">RESERVAR</a>
                                </div>
                            </div>



                        </div>
                        <div class="paginacao_ofertas">
                            <ul class="lista_paginacao">
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
