import React from "react";
import './Card.css';

const Card =({card})=> {
    return(
        <div className="cardContainer">
            <div className="front">
                <div className="deutsch">{card.deu}</div>
            </div>
            <div className="back">
                <div className="english">{card.eng}</div>
            </div>
        </div>
    )
}

export default Card