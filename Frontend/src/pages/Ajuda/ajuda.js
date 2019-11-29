import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class ajuda extends Component {
    render() {
        return (
            <div>
                <Header />
                <main>
                    <div className="cont_branco" id="accordionExample">
                                <div className="card_aj">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                                            <button className="btn_aj " type="button" data-toggle="collapse" data-target="#collapseOne"
                                                aria-expanded="true" aria-controls="collapseOne">
                                                Como funciona o Datempo<hr />
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                        data-parent="#accordionExample">
                                        <div className="card-body">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                            3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                            laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin
                                            coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                            occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard
                                            of them accusamus labore sustainable VHS.
                                        </div>
                                    </div>
                                </div>
                                <div className="card_aj">
                                    <div className="card-header" id="headingTwo">
                                        <h2 className="mb-0">
                                            <button className="btn_aj" type="button" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Como anunciar os produtos<hr />
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                            3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                            laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin
                                            coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                            occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard
                                            of them accusamus labore sustainable VHS.
                                        </div>
                                    </div>
                                </div>
                                <div className="card_aj">
                                    <div className="card-header" id="headingThree">
                                        <h2 className="mb-0">
                                            <button className="btn_aj" type="button" data-toggle="collapse"
                                                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Opções de retirada<hr />
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                            3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                            laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin
                                            coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                            occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard
                                            of them accusamus labore sustainable VHS.
                                </div>
                                    </div>
                                </div>
                        <div className="card_aj">
                            <div className="card-header" id="headingfor">
                                <h2 className="mb-0">
                                    <button className="btn_aj" type="button" data-toggle="collapse"
                                        data-target="#collapsefor" aria-expanded="false" aria-controls="collapsefor">
                                        Como reservar no site<hr />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapsefor" className="collapse" aria-labelledby="headingfor" data-parent="#accordionExample">
                                <div className="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                    3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                    laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin
                                    coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                                    anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                    occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard
                                    of them accusamus labore sustainable VHS.
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
export default ajuda;