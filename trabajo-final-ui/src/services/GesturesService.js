function MakeBaseGesture(nombre, ganaA, pierdeCon){
    this.nombre = nombre
    this.ganaA = ganaA
    this.pierdeCon = pierdeCon
    this.lucha = (gestoOponente) => {
        if(this.ganaA.includes(gestoOponente) || this.pierdeCon.includes(gestoOponente)){
            let res = this.ganaA.includes(gestoOponente) ? "ganador" : "perdedor"
            return res
        }else{
            return "empate"
        }
    }
}

const Rock = new MakeBaseGesture("rock", ["lizard", "scissors"], ["paper", "spock"])

const Paper = new MakeBaseGesture("paper", ["rock", "spock"], ["scissors", "lizard"])

const Scissors = new MakeBaseGesture("scissors", ["lizard", "paper"], ["rock", "spock"])

const Lizard = new MakeBaseGesture("lizard", ["spock", "paper"], ["rock", "scissors"])

const Spock = new MakeBaseGesture("spock", ["rock", "scissors"], ["lizard", "paper"])

const evaluarLucha = (selectionPlayerOne, selectionPlayerTwo, callbackEvaluador) => {
    switch(selectionPlayerOne){
        case "rock":
            callbackEvaluador(Rock.lucha(selectionPlayerTwo))
            break;
        case "paper":
            callbackEvaluador(Paper.lucha(selectionPlayerTwo))
            break;
        case "scissors":
            callbackEvaluador(Scissors.lucha(selectionPlayerTwo))
            break;
        case "lizard":
            callbackEvaluador(Lizard.lucha(selectionPlayerTwo))
            break;
        case "spock":
            callbackEvaluador(Spock.lucha(selectionPlayerTwo))
            break;
        default:
            console.log("holis")
    }
}

export {
    Rock,
    Paper,
    Scissors,
    Lizard,
    Spock,
    evaluarLucha
};
