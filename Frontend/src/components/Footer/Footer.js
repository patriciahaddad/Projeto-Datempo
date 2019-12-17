import React, { Component } from 'react';
import '../../assets/css/footer.css';

class Footer extends Component {

    render() {
        return (
            <footer>
                {/* <div class="fixed-action-btn smooth-scroll" style="bottom: 45px; right: 24px;">
                <a href="#top-section" class="btn-floating btn-large red">
                    <i class="fas fa-arrow-up"></i>
                </a>
                </div> */}
                    <p>Alameda Barão de Limeira, 539 - Campos Elíseos, São Paulo - SP</p>
                    <p>Telefone: (11) 3273-5000</p>
                    <div className="redes_sociais">
                        <a><i className="fab fa-facebook-f"></i></a>
                        <a><i className="fab fa-instagram"></i></a>
                        <a><i className="fab fa-linkedin-in"></i></a>
                        <a><i className="fab fa-twitter"></i></a>
                    </div>
                    <p className="datempo">Datempo by Linx © 2019</p>
                </footer>
        );
    }
}
export default Footer;