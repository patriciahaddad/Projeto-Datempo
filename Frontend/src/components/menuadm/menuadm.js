import React, { Component } from 'react';
import '../../assets/css/menuadm.css';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
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
        {/* <MDBDropdown dropdown>
          <MDBDropdownToggle className="adm_btn_01" caret color="purple darken-1">
            CATEGORIA
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem><Link to="/categoria">Visualizar/Cadastrar</Link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBDropdown dropright>
          <MDBDropdownToggle className="adm_btn_01" caret color="purple darken-1">
            OFERTA 
      </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem><Link to="/ofertas">Visualizar</Link></MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem><Link to="/cadastrooferta">Cadastrar</Link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBDropdown dropright>
          <MDBDropdownToggle className="adm_btn_01" caret color="purple darken-1">
            PRODUTO
      </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem><Link to="/produto">Visualizar/Cadastrar</Link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBDropdown dropright>
          <MDBDropdownToggle className="adm_btn_01" caret color="purple darken-1">
            USUÁRIO
      </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem><Link to="/usuario">Visualizar</Link></MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem><Link to="/cadastrousuario">Cadastrar</Link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown> */}

        <div class="accordion" id="accordionExample">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
                  CATEGORIA
        </button>
              </h5>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
              data-parent="#accordionExample">
              <div class="card-body">
                <Link to="/categoria">Visualizar/Cadastrar</Link>
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
                <Link to="/ofertas">Visualizar</Link><br></br>
                <Link to="/cadastrooferta">Cadastrar</Link>
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
                <Link to="/produto">Visualizar/Cadastrar</Link>
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