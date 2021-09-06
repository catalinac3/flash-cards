import React from "react";
import './Card.css';

const Card =(props)=> {
    return(
        <div className="cardContainer">
            <div className="front">
                <div className="deutsch">{props.deu}</div>
            </div>
            <div className="back">
                <div className="english">{props.eng}</div>
            </div>
        </div>
    )
}

export default Card