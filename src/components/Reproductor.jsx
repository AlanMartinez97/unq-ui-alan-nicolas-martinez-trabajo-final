import React from 'react';
import '../css/Reproductor.css';

function Reproductor(){
    return (
        <div className="container">
            <div className="row">
                <div className="col s4 offset-s4">
                    <h4 className="center">Reglas del juego</h4>
                </div>
            </div>
            <div className="row video-container scale-transition">
                <iframe title="reglas" width="1040" height="585" src="https://www.youtube.com/embed/_PUEoDYpUyQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
            </div>
        </div>
    )
}

export default Reproductor;