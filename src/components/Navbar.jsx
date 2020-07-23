import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav>
            <div className="nav-wrapper pink darken-2">
                <Link to="/" className="brand-logo">
                    <div>
                        <img height="25" width="45" src="/hand_rock.svg" alt="rock" />
                        <img height="25" width="45" src="/hand_paper.svg" alt="paper" />
                        <img height="25" width="45" src="/hand_scissors.svg" alt="scissors"/>
                        <img height="25" width="45" src="/hand_lizard.svg" alt="lizard"/>
                        <img height="25" width="45" src="/hand_spock.svg" alt="spock"/>
                    </div>
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/unJugador">1 jugador</Link></li>
                    <li><Link to="/dosJugadores">2 jugadores</Link></li>
                    <li><Link to="/reglas">Reglas</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;