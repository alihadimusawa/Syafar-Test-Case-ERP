import React from "react";
import BigButton from "./BigButton";
import "./Header.css";

function Header(props) {
    return (
        <div className="header">

            {props.homepage ? <BigButton text="Admin" onClick={props.changeAdmin} /> : ""}


            <BigButton
                text="Logout"
                onClick={props.logout}
            />
        </div>
    )
}

export default Header;