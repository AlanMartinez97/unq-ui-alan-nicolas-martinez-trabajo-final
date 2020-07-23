import React from 'react';

function Preloader(){
    return(
        <div id="eleccion-preloader" className="preloader-wrapper big">
            <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div>
            <div className="gap-patch">
                <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
                <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}

export default Preloader;