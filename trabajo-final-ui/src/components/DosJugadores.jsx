import React, { useState, useEffect } from 'react';
import TablaPuntuacion from './TablaPuntuacion';
import M from 'materialize-css/dist/js/materialize.min.js';
import {renderGestures} from '../services/PlayerService.js';
import HandGesture from './HandGesture';
import {evaluarLucha} from '../services/GesturesService';


function DosJugadores(){

    const [eleccionJugadorUno, setEleccionJugadorUno] = useState(null)

    const [eleccionJugadorDos, setEleccionJugadorDos] = useState(null)

    const [puntuaciones, setPuntuaciones] = useState([])

    const [seleccionJugadorUno, setSeleccionJugadorUno] = useState("")
    const [seleccionJugadorDos, setSeleccionJugadorDos] = useState("")

    useEffect(() => {
        let collapsibleJugadores = document.querySelector(".collapsible")
        M.Collapsible.init(collapsibleJugadores, {
            accordion:false,
            inDuration:250,
            outDuration:250
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            abrirCollapsibles()
        }, 300)
        
        let restartButtons = document.querySelectorAll(".restart")
        restartButtons.forEach(button => {
            M.Tooltip.init(button)
        })
    }, [])

    const toggleDisableChoices = (choicesClass) => {
        let choices = document.querySelectorAll("." + choicesClass)
        choices.forEach(choice => {
            choice.classList.toggle("disabled-choice")
        })
    }

    const closeCollapsible = (index) => {
        let collapsible = document.querySelector(".collapsible")
        let collapsibleInstance = M.Collapsible.getInstance(collapsible)

        collapsibleInstance.close(index)
    }

    const setEleccion = (jugador, gesture) => {
        if(jugador === "jugadorUno"){
            setSeleccionJugadorUno(gesture)
            setEleccionJugadorUno(<HandGesture gesture={gesture} classes={jugador + "-choice"}/>)
        }else{
            setSeleccionJugadorDos(gesture)
            setEleccionJugadorDos(<HandGesture gesture={gesture} classes={jugador + "-choice"}/>)
        }
    }

    const toggleRenderChoices = () => {
        let eleccionJugadorUnoParent = document.querySelector(".jugadorUno-choice-parent")
        let eleccionJugadorDosParent = document.querySelector(".jugadorDos-choice-parent")

        eleccionJugadorUnoParent.classList.toggle("scale-out")
        eleccionJugadorDosParent.classList.toggle("scale-out")
    }

    const evaluarJuego = () => {
        setTimeout(() => {

            abrirCollapsibles()
        }, 750)

        setTimeout(() => {
            toggleRenderChoices()
            evaluarLucha(seleccionJugadorUno, seleccionJugadorDos, evaluarGanador)
        }, 1250)
        
    }

    const actualizarTablaPuntuacion = (jugadorUno, jugadorDos) => {
        setPuntuaciones([...puntuaciones, {
            jugador:jugadorUno,
            jugadorDos:jugadorDos
        }])
    }

    const evaluarGanador = (estado) =>{
        switch(estado){
            case "ganador":
                M.toast({html:"Ganaste :D", classes:"rounded green jugadorUno-toast"})
                M.toast({html:"Perdiste D:", classes:"rounded red jugadorDos-toast"})
                actualizarTablaPuntuacion(1,0)
                toggleRestartButton("jugadorUno")
                break;
            case "perdedor":
                M.toast({html:"Perdiste D:", classes:"rounded red jugadorUno-toast"})
                M.toast({html:"Ganaste :D", classes:"rounded green jugadorDos-toast"})
                actualizarTablaPuntuacion(0,1)
                toggleRestartButton("jugadorDos")
                break;
            case "empate":
                M.toast({html:"Empataron D:D", classes:"rounded jugadorUno-toast"})
                actualizarTablaPuntuacion(0,0)
                toggleRestartButton("jugadorUno")
                toggleRestartButton("jugadorDos")
                break;
            default:
                console.log("default")
        }
    }

    const toggleRestartButton = (jugador) => {
        let restartButton = document.querySelector(".restart-" + jugador)

        restartButton.classList.toggle("hide")
        setTimeout(() => {
            restartButton.classList.toggle("scale-out")
        }, 250)
    }

    const abrirCollapsibles = () => {
        let collapsible = document.querySelector(".collapsible")
        let instanceCollapsible = M.Collapsible.getInstance(collapsible)

        instanceCollapsible.open(0)
        instanceCollapsible.open(1)
    }

    useEffect(() => {
        if(seleccionJugadorUno !== "" && seleccionJugadorDos !== ""){
            evaluarJuego()
        }
    }, [seleccionJugadorUno, seleccionJugadorDos])

    const restartButton = (jugador) => {
        return(
        <button className={"btn-floating waves-effect waves-light orange darken-3 tooltipped scale-transition scale-out hide restart restart-" + jugador} 
        onClick={ event =>{ 
            event.preventDefault()
            restartGame() 
            }} data-position="right" data-tooltip="Volver a jugar?">
            <i className="material-icons large">autorenew</i>
        </button>)
    }

    const deRenderRestartButtons = () => {
        let buttons = document.querySelectorAll(".restart")
        buttons.forEach(button => {
            if(!(button.classList.contains("hide") && button.classList.contains("scale-out"))){
                button.classList.toggle("hide")
                button.classList.toggle("scale-out")
            }
        })
    }

    const restartGame = () => {
        setSeleccionJugadorUno("")
        setSeleccionJugadorDos("")

        setEleccionJugadorUno(null)
        setEleccionJugadorDos(null)

        toggleDisableChoices("jugadorUno-choices")
        toggleDisableChoices("jugadorDos-choices")

        closeCollapsible(0)
        closeCollapsible(1)

        toggleRenderChoices()

        deRenderRestartButtons()

        setTimeout(() => {
            abrirCollapsibles()
        },500)
    }

    return(
        <div className="row">
            <div className="col s9">
                <ul className="collapsible expandable">
                    <li className="collapsible-jugadorUno">
                        <div className="collapsible-header blue-grey darken-1">
                            <i className="material-icons">person</i>
                            Jugador Uno
                        </div>
                        <div className="collapsible-body">
                            <div className="row center">
                                {renderGestures((gesture) =>
                                    {
                                        closeCollapsible(0)
                                        toggleDisableChoices("jugadorUno-choices")
                                        setEleccion("jugadorUno", gesture)
                                    },
                                    "jugadorUno-choices", 
                                    "jugadorUno")}
                            </div>
                            <div className="row center jugadorUno-choice-parent scale-transition scale-out">
                                {eleccionJugadorUno 
                                    ? eleccionJugadorUno
                                    : <HandGesture gesture="blank" />
                                }
                            </div>
                            <div className="center">
                                {restartButton("jugadorUno")}
                            </div>
                        </div>
                    </li>
                    <li className="collapsible-jugadorDos">
                        <div className="collapsible-header blue-grey darken-1"><i className="material-icons">group</i>Jugador Dos</div>
                        <div className="collapsible-body">
                            <div className="center">
                                {restartButton("jugadorDos")}
                            </div>
                            <div className="row center jugadorDos-choice-parent scale-transition scale-out">
                                {eleccionJugadorDos 
                                    ? eleccionJugadorDos
                                    : <HandGesture gesture="blank" />
                                }
                            </div>
                            <div className="row center">
                                {renderGestures((gesture)=> 
                                    {
                                        closeCollapsible(1)
                                        toggleDisableChoices("jugadorDos-choices")
                                        setEleccion("jugadorDos", gesture)
                                    }, 
                                    "jugadorDos-choices", 
                                    "jugadorDos")}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="col s3">
                <TablaPuntuacion sonDosJugadores={true} puntuaciones={puntuaciones}/>
            </div>

        </div>
    )
}

export default DosJugadores;