import React, { Component } from 'react';
import '../../assets/css/menuadm.css';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { Link } from 'react-router-dom';

class Menuadm extends Component {

  render() {
    return (
      <div className="adm_configs_esq">
        <MDBDropdown dropright>
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
        </MDBDropdown>
      </div>
    );
  }
}
export default Menuadm;