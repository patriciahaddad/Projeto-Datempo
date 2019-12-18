import React, { Component } from 'react';
import '../../assets/css/footer.css';
import { Link} from 'react-router-dom';

class Footer extends Component {

    render() {
        return (
            <footer>
                <p>Alameda Barão de Limeira, 539 - Campos Elíseos, São Paulo - SP</p>
                <p>Telefone: (11) 3273-5000</p>
                <div className="redes_sociais">
                    <Link><i className="fab fa-facebook-f"></i></Link>
                    <Link><i className="fab fa-instagram"></i></Link>
                    <Link><i className="fab fa-linkedin-in"></i></Link>
                    <Link><i className="fab fa-twitter"></i></Link>
                </div>
                <p className="datempo">Datempo by Linx © 2019</p>
            </footer>
        );
    }
}
export default Footer;