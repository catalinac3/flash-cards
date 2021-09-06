import React from "react";
import './Button.css';

const Button =(props)=> {
    return(
       <button onClick={props.updateCard}>New Card</button>
    )
}

export default Button;