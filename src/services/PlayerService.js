import React from 'react';
import {Link} from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';
import HandGesture from '../components/HandGesture';
import '../css/DosJugadores.css'

const spinBotCarouselTo = (spinToIndex, itemsCount, callbackForFinal, carouselId = "eleccion-maquina-carousel") => {
    let maquinaCarousel = document.getElementById(carouselId)
    let carouselInstance = M.Carousel.getInstance(maquinaCarousel)
    let count = 1
    let laps = 0

    carouselInstance.options.onCycleTo = () => {
        count= count + 1
        if(count % itemsCount === 0){
            laps += 1
        }
    }

    let intervalId = setInterval(() => {
        carouselInstance.next()
    },35)

    setTimeout(() => {
        clearInterval(intervalId)

        intervalId = setInterval(() => {
            carouselInstance.next()
        }, 70)
    }, 1500)

    setTimeout(() => {
        clearInterval(intervalId)

        intervalId = setInterval(() => {
            carouselInstance.next()
        }, 140)
    },3000)

    setTimeout(() => {
        clearInterval(intervalId)

        intervalId = setInterval(() => {
            carouselInstance.next()
            if(((laps * itemsCount) + spinToIndex) === count){
                clearInterval(intervalId)
                callbackForFinal()
            }
        }, 280);
    }, 4500)
}

const togglePlayerChoices = () => {
    let playerChoices = document.querySelectorAll(".player-choices")
    playerChoices.forEach(playerChoice => {
        playerChoice.classList.toggle("disabled-choice")
    })
}

const gestures = ["rock", "paper", "scissors", "lizard", "spock"]

const renderGestures = (callbackClick, classes, jugador="jugadorUno") => {
    let res = []
    gestures.forEach(gesture => {
        let gestureElem = <HandGesture gesture={gesture} classes={classes}/>
        let elegibleGesture = 
            <Link key={"key-" + jugador + gesture} to="#" onClick={(e) => {
                e.preventDefault()
                callbackClick(gesture)
                }}>
                {gestureElem}
            </Link>
        res.push(elegibleGesture)
    })
    return res
}

export {
    spinBotCarouselTo,
    togglePlayerChoices,
    renderGestures
}