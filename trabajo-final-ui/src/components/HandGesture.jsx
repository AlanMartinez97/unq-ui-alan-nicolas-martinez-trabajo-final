import React from 'react';
import '../css/HandGesture.css';

function HandGesture({gesture, classes=""}){

    return(
        <img height="110" width="170" className={"svg-img scale-transition " + classes}  src={"/hand_" + gesture + ".svg"} alt={"hand_" + gesture}/>
    )
}

export default HandGesture;