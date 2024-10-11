import React from "react";


function BigButton(props) {

    function handleClick(text){

    }

    return (
        <div className="bigButton">
            <button className="BigButton" onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default BigButton;