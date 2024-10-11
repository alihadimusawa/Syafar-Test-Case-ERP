import React from "react";

function InputBox(props){
    return(
        <div className="inputBox">
            <h3>{props.boxHeading}</h3>
            <input type={props.type} id={props.type} name={props.type} placeholder={props.placeHolder || ""} value={props.value} />
        </div>
    )
}

export default InputBox;