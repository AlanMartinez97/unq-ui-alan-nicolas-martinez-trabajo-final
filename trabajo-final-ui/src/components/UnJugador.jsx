import React, { useState, useEffect } from 'react';
import '../css/UnJugador.css'
import HandGesture from './HandGesture';
import M from 'materialize-css/dist/js/materialize.min.js';
import CarouselGestures from './CarouselGestures';
import TablaPuntuacion from './TablaPuntuacion';
import {evaluarLucha} from '../services/GesturesService.js';
import {spinBotCarouselTo, togglePlayerChoices, renderGestures} from '../services/PlayerService.js'


function UnJugador(){

    const [eleccion, setEleccion] = useState(null)

    const [eleccionBot, setEleccionBot] = useState(null)

    const [puntuaciones, setPuntuaciones] = useState([])

    const gestures = ["rock", "paper", "scissors", "lizard", "spock"]

    let selectionPlayer = ""
    let selectionBot = ""

    useEffect(() => {
        let buttonRestart = document.querySelector(".restart")
        M.Tooltip.init(buttonRestart)
    })

    const spinBotCarouselToRandom = () => {
        let randomNumber = Math.floor((Math.random() * 5))
        spinBotCarouselTo(randomNumber, gestures.length, () => {
            setAndRenderBotEleccion(randomNumber)
            evaluarLucha(selectionPlayer, selectionBot, evaluarGanador)
        })
    }

    const actualizarTablaPuntuacion = (jugador, jugadorDos) => {
        setPuntuaciones([...puntuaciones, {
            jugador:jugador,
            jugadorDos:jugadorDos
        }])
    }

    const restartGame = () => {
        let carouselInstance = M.Carousel.getInstance(document.getElementById("eleccion-maquina-carousel"))
        carouselInstance.set(0)
        let restartButton = document.querySelector(".restart")
        let eleccionBotDiv = document.getElementById("eleccion-maquina-parent")
        let eleccionPlayerDiv = document.getElementById("eleccion-jugador-parent")

        selectionPlayer = ""
        selectionBot = ""

        eleccionBotDiv.classList.toggle("scale-out")
        eleccionPlayerDiv.classList.toggle("scale-out")

        setEleccion(null)
        setEleccionBot(null)
        togglePlayerChoices()

        restartButton.classList.toggle("scale-out")

    }

    let restartButton = 
        <button className="btn-floating waves-effect waves-light orange darken-3 restart tooltipped scale-transition scale-out" 
        onClick={ event =>{ 
            event.preventDefault()
            restartGame() }} data-position="right" data-tooltip="Volver a jugar?">
            <i className="material-icons large">autorenew</i>
        </button>

    const setAndRenderBotEleccion = index => {
        let gestureElem = <HandGesture gesture={gestures[index]} classes="bot-choice"/>
        let eleccionBotDiv = document.getElementById("eleccion-maquina-parent")

        selectionBot = gestures[index]
        setEleccionBot(gestureElem)
        eleccionBotDiv.classList.toggle("scale-out")
    }

    const setAndRenderPlayerEleccion = (gesture) => {
        let eleccionParent = document.getElementById("eleccion-jugador-parent")
        let gestureElem = <HandGesture gesture={gesture} classes="player-choice"/>
        selectionPlayer = gesture
        if(eleccion != null){
            eleccionParent.classList.toggle("scale-out")
            setTimeout(() => {
                setEleccion(gestureElem)
                eleccionParent.classList.toggle("scale-out")
            }, 250)
    
        }else{
            setEleccion(gestureElem)
            eleccionParent.classList.toggle("scale-out")
        }
    }

    const evaluarGanador = (estado) => {
        switch(estado){
            case "ganador":
                M.toast({html:"Ganaste :D", classes:"rounded green darken-1"})
                actualizarTablaPuntuacion(1,0)
                break;
            case "perdedor":
                M.toast({html:"Perdiste D:", classes:"rounded red"})
                actualizarTablaPuntuacion(0,1)
                break;
            case "empate":
                M.toast({html:"Empate D:D", classes:"rounded"})
                actualizarTablaPuntuacion(0,0)
                break;
            default:
                console.log("default")
        }

        let restartButton = document.querySelector(".restart")
        restartButton.classList.toggle("scale-out")
        
    }

    return(
        <div className="row">
            <div className="col s9">
                <div className="elecciones-maquina-container center">
                    <div className="row">
                        <div id="carousel-maquina-parent" className="">
                            <CarouselGestures gestures={gestures} />
                            <div className="row">
                                <div id="eleccion-maquina-parent" className="scale-transition scale-out">
                                    { eleccionBot
                                        ? eleccionBot
                                        : <HandGesture gesture="blank" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row center">
                    {restartButton}
                </div>

                <div className="elecciones-jugador-container container center">
                    <div className="row">
                        <div id="eleccion-jugador-parent" className="scale-transition scale-out">
                            {eleccion 
                                ? eleccion
                                : <HandGesture gesture="blank" />
                            }
                        </div>
                    </div>
                    <div className="row">
                        {renderGestures((gesture) => {
                            setAndRenderPlayerEleccion(gesture)
                            togglePlayerChoices()
                            spinBotCarouselToRandom()
                        }, "seleccionable player-choices")}
                    </div>
                </div>
            </div>

            <div className="col s3">
                <TablaPuntuacion puntuaciones={puntuaciones}/>
            </div>
        </div>
    )
}

export default UnJugador;