import React from 'react';

function App() {
  return (
    <div>
    <header>
        <div className="container_h">
            <img className="logo" src="Imagens/Logo6.svg" alt="Logo Datempo"/>
            <nav>
                <ul className="menu">
                    <li><a href="index.html" title="Home">Home</a></li>
                    <li><a href="sobrenos.html" title="Sobre nós">Sobre nós</a></li>
                    <li><a href="mostruario.html" title="Produtos">Produtos</a></li>
                    <li><a href="login.html" title="Login">Login</a></li>
                </ul>
                <div className="pesquisa">
                    <input type="text" id="txtbusca" placeholder="Buscar produtos..." aria-label="Buscar produtos"/>
                    <img src="imagens/magnifying-glass-icon.png" id="btnbusca" alt="Buscar"/>
                </div>
            </nav>
        </div>
    </header>
    <main>
        <div className="banner"></div>
        <section>
            <div className="container">
                <h2>PRODUTOS MAIS VENDIDOS</h2>
                <hr/>
                <div className="container_card">
                    <div className="card_oferta">
                        <div className="caixa_imagem">
                            <img src="Imagens/arroz.png" alt="Arroz tipão"/>
                        </div>
                        <p className="nomeproduto">NOMEPRODUTO</p>
                        <div className="info">
                            <p className="preco">PREÇO</p>
                            <p className="desconto">DESC</p>
                        </div>
                    </div>
                    <div className="card_oferta">
                        <div className="caixa_imagem">
                            <img src="Imagens/arroz.png" alt="Arroz tipão"/>
                        </div>
                        <p className="nomeproduto">NOMEPRODUTO</p>
                        <div className="info">
                            <p className="preco">PREÇO</p>
                            <p className="desconto">DESC</p>
                        </div>
                    </div>
                    <div className="card_oferta">
                        <div className="caixa_imagem">
                            <img src="Imagens/arroz.png" alt="Arroz tipão"/>
                        </div>
                        <p className="nomeproduto">NOMEPRODUTO</p>
                        <div className="info">
                            <p className="preco">PREÇO</p>
                            <p className="desconto">DESC</p>
                        </div>
                    </div>
                    <div className="card_oferta">
                        <div className="caixa_imagem">
                            <img src="Imagens/arroz.png" alt="Arroz tipão"/>
                        </div>
                        <p className="nomeproduto">NOMEPRODUTO</p>
                        <div className="info">
                            <p className="preco">PREÇO</p>
                            <p className="desconto">DESC</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="sobre">
            <div className="banner_sobre">
                <h2>SOBRE NÓS</h2>
                <hr/>
                <p><br/> Você encontrará em nossa plataforma ofertas de produtos como: alimentos que estão perto do vencimento e vestimentas que possuem pouca circulação no estoque. Saiba mais sobre nosso propósito!<br/>
                    Nunca é tarde, sempre DATEMPO! </p>
            </div>
        </section>
        <section>
            <div className="container">
                <h2>EMPRESAS PARCEIRAS</h2>
                <hr/>
                <div className="container_marcas">
                    <img src="Imagens/logodia.svg" alt="Logo Dia"/>
                    <img src="Imagens/walmart.png" alt="Logo Walmart"/>
                    <img src="Imagens/prada.png" alt="Logo Prada"/>
                    <img src="Imagens/CalvinKleinlogo.svg" alt="Logo Calvin Klein"/>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <p>Alameda Barão de Limeira, 539 - Campos Elíseos, São Paulo - SP</p>
        <p>Telefone: (11) 3273-5000</p>
        <div className="redes_sociais">
            <a href="#" title="icone para redirecionamento para facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" title="icone para redirecionamento para instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" title="icone para redirecionamento para linkedin"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" title="icone para redirecionamento para twitter"><i className="fab fa-twitter"></i></a>
        </div>
        <p>Datempo by Linx © 2019</p>
    </footer>
    </div>
  );
}


export default App;
