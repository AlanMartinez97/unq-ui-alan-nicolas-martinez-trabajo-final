import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Home.css'

function Home(){
    return(
        <div className="container">
            <div className="home-card row center">
                <div className="col s12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title center">Bienvenido a Piedra, Papel, Tijera, Lagarto, Spock.</span>
                            <p>Juego creado por Sam Kass con la ayuda de Karen Bryla y popularizado por
                                la serie The Big Bang Theory.
                            </p>
                        </div>
                        <div className="card-action valign-wrapper">
                            <Link className="btn waves-effect waves-light pink darken-2" to="/unJugador">
                                <i className="material-icons left">person</i>
                                1 Jugador
                            </Link>
                            <Link className="btn waves-effect waves-light pink darken-2" to="/dosJugadores">
                                <i className="material-icons left">group</i>
                                2 Jugadores
                            </Link>
                            <Link className="btn waves-effect waves-light pink darken-2" to="/reglas">
                                <i className="material-icons left">rule</i>
                                Reglas
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;