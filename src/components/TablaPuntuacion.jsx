import React from 'react';
import '../css/TablaPuntuacion.css'

function TablePuntuacion({sonDosJugadores=false, puntuaciones}){

    let puntuacionJugador = 0
    let puntuacionJugadorDos = 0

    const columnasPuntaje = puntuaciones.map((puntuacion, index) => {
        puntuacionJugador += puntuacion.jugador
        puntuacionJugadorDos += puntuacion.jugadorDos
        return (
        <tr key={index + 1}>
            <td>{puntuacionJugador}</td>
            <td>{index + 1}</td>
            <td>{puntuacionJugadorDos}</td>
        </tr>
        )
    })

    return(
        <table className="striped highlight responsive-table centered">
            <thead>
                <tr>
                    <th>Jugador</th>
                    <th>Nº Ronda</th>
                    <th>{sonDosJugadores ? "Jugador 2" : "Máquina"}</th>
                </tr>
            </thead>
            <tbody id="tbody-puntuacion">
                {columnasPuntaje}
            </tbody>
        </table>
    )
}

export default TablePuntuacion;

