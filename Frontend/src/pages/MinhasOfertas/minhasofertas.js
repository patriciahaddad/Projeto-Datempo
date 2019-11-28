import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import arrozjoao from '../../assets/imagens/arroz.png';
import alarme from '../../assets/imagens/alarm-clock.png';

class Minhasofertas extends Component {
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
                                <a href="cadastroOfertas.html" className="btn_cria_Oferta">cadastrar ofertas</a>
                                <a href="#" className="btn-filtro">Selecione por:</a>
                            </div>
                            </div>
                            <p className="qnt_ofertas">Mostrando 1 - 12 de 30 resultados</p>

                            <div className="container_ofertas">
                                <div className="card_oferta">
                                <div className="img_oferta">
                                    <img src={arrozjoao} alt="Pacote de Arroz de 5kg da marca Tio João" />
                                </div>
                                    <div className="descricao_oferta">
                                    <div className="titulo_produto">
                                        <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                    </div>
                                        <div className="descricao_pequena">
                                        <p className="titulo_descricao">Preço</p>
                                        <p className="descricao">R$ 8,00</p>
                                    </div>
                                        <div className="descricao_pequena_logo">
                                            <p className="titulo_descricao_logo">DATEMPO</p>
                                        <div className="validade_mostruario">
                                            <img src={alarme} alt="Alarme" />
                                            <p className="descricao"> Faltam: 10 dias!</p>
                                        </div>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                            </div>

                                <div className="card_oferta">
                                    <div className="img_oferta">
                                        <img src={arrozjoao} alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Preço</p>
                                            <p className="descricao">R$ 8,00</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Validade</p>
                                            <p className="descricao">18/09/2019</p>
                                        </div>
                                        <div className="descricao_pequena avaliacao">
                                            <p className="titulo_descricao">Avaliações</p>
                                            <img src="Imagens/estrelas.png" alt="avaliacao do produto segundo os clientes" />
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                                </div>

                                <div className="card_oferta">
                                    <div className="img_oferta">
                                        <img src="Imagens/arroz.png" alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Preço</p>
                                            <p className="descricao">R$ 8,00</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Validade</p>
                                            <p className="descricao">18/09/2019</p>
                                        </div>
                                        <div className="descricao_pequena avaliacao">
                                            <p className="titulo_descricao">Avaliações</p>
                                            <img src="Imagens/estrelas.png" alt="avaliacao do produto segundo os clientes" />
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                                </div>

                                <div className="card_oferta">
                                    <div className="img_oferta">
                                        <img src="Imagens/arroz.png" alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Preço</p>
                                            <p className="descricao">R$ 8,00</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Validade</p>
                                            <p className="descricao">18/09/2019</p>
                                        </div>
                                        <div className="descricao_pequena avaliacao">
                                            <p className="titulo_descricao">Avaliações</p>
                                            <img src="Imagens/estrelas.png" alt="avaliacao do produto segundo os clientes" />
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                                </div>

                                <div className="card_oferta">
                                    <div className="img_oferta">
                                        <img src="Imagens/arroz.png" alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Preço</p>
                                            <p className="descricao">R$ 8,00</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Validade</p>
                                            <p className="descricao">18/09/2019</p>
                                        </div>
                                        <div className="descricao_pequena avaliacao">
                                            <p className="titulo_descricao">Avaliações</p>
                                            <img src="Imagens/estrelas.png" alt="avaliacao do produto segundo os clientes" />
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                                </div>

                                <div className="card_oferta">
                                    <div className="img_oferta">
                                        <img src="Imagens/arroz.png" alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Preço</p>
                                            <p className="descricao">R$ 8,00</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Validade</p>
                                            <p className="descricao">18/09/2019</p>
                                        </div>
                                        <div className="descricao_pequena avaliacao">
                                            <p className="titulo_descricao">Avaliações</p>
                                            <img src="Imagens/estrelas.png" alt="avaliacao do produto segundo os clientes" />
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                                </div>

                                <div className="card_oferta">
                                    <div className="img_oferta">
                                        <img src="Imagens/arroz.png" alt="Pacote de Arroz de 5kg da 
                                        marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Preço</p>
                                            <p className="descricao">R$ 8,00</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Validade</p>
                                            <p className="descricao">18/09/2019</p>
                                        </div>
                                        <div className="descricao_pequena avaliacao">
                                            <p className="titulo_descricao">Avaliações</p>
                                            <img src="Imagens/estrelas.png" alt="avaliacao do produto segundo os clientes" />
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                                </div>
                                <div className="card_oferta">
                                    <div className="img_oferta">
                                        <img src="Imagens/arroz.png" alt="Pacote de Arroz de 5kg da marca Tio João" />
                                    </div>
                                    <div className="descricao_oferta">
                                        <div className="titulo_produto">
                                            <p className="titulo descricao">Arroz Tio João - 5kg</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Preço</p>
                                            <p className="descricao">R$ 8,00</p>
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Validade</p>
                                            <p className="descricao">18/09/2019</p>
                                        </div>
                                        <div className="descricao_pequena avaliacao">
                                            <p className="titulo_descricao">Avaliações</p>
                                            <img src="Imagens/estrelas.png" alt="avaliacao do produto segundo os clientes" />
                                        </div>
                                        <div className="descricao_pequena">
                                            <p className="titulo_descricao">Reservados</p>
                                            <p className="descricao">100</p>
                                        </div>
                                    </div>
                                    <div className="botoes_oferta">
                                        <a href="#" className="btn_edita_oferta">Editar</a>
                                        <a href="#" className="btn_apaga_oferta">Apagar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="paginacao_ofertas">
                                <ul className="lista_paginacao">
                                    <a href="#" clas="lk_paginacao">
                                        <li>
                                        </li> < </a> <a href="#">
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
                            </div> */}
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Minhasofertas;