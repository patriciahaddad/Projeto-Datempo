import React, { Component } from 'react';
import '../../assets/css/menuadm.css';
import { Link } from 'react-router-dom';

class Menuadm extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="adm_configs_esq">
        <div class="accordion" id="accordionExample">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                  aria-expanded="false" aria-controls="collapseOne">
                  CATEGORIA
                </button>
              </h5>
            </div>
            <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
              data-parent="#accordionExample">
              <div class="card-body">
                <Link to="/adm/categoria">Visualizar/Cadastrar</Link>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                  data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  OFERTA
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="card-body">
                <Link to="/adm/ofertas">Visualizar</Link><br></br>
                <Link to="/adm/cadastrooferta">Cadastrar</Link>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                  data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  PRODUTO
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div class="card-body">
                <Link to="/adm/produto">Visualizar/Cadastrar</Link>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingFour">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                  data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  USUÁRIO
                </button>
              </h5>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
              <div class="card-body">
                <Link to="/adm/usuario">Visualizar</Link><br></br>
                <Link to="/adm/cadastrousuario">Cadastrar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menuadm;