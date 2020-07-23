import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../css/CarouselGestures.css'

function CarouselGestures({gestures}){

    const carousel_items = gestures.map((gesture, index) => 
        <a key={"key-hand_" + gesture} className="carousel-item" href={"#" + index}>
            <img height="110" width="170" src={"/hand_" + gesture + ".svg"} alt={"hand" + gesture}/>
        </a>
    )

    useEffect(() => {
        let maquinaCarousel = document.getElementById("eleccion-maquina-carousel")
        let options = {
            duration:30,
            dist:0,
            shift:0
        }
        let carouselInstance = M.Carousel.init(maquinaCarousel, options)

        //Desactivo los events listener que me permiten hacer draggable el carousel
        maquinaCarousel.removeEventListener('mousedown', carouselInstance._handleCarouselTapBound);
        maquinaCarousel.removeEventListener('mousemove', carouselInstance._handleCarouselDragBound);
        maquinaCarousel.removeEventListener('mouseup', carouselInstance._handleCarouselReleaseBound);
        maquinaCarousel.removeEventListener('mouseleave', carouselInstance._handleCarouselReleaseBound);
        maquinaCarousel.removeEventListener('click', carouselInstance._handleCarouselClickBound);
    }, [])

    return(
        <div id="eleccion-maquina-carousel" className="carousel row">
            {carousel_items}
        </div>
    )
}


export default CarouselGestures;