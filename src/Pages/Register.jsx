import React, { useState } from "react";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Register(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondpass, setSecond] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function changeErrorMessage(message) {
        setErrorMessage(message);
    }

    function changeEmail(events) {
        let tempEmail = events.target.value;
        setEmail(tempEmail);
    };

    function changePassword(events) {
        let tempPassword = events.target.value;
        setPassword(tempPassword);
    }

    function changeSecond(events) {
        let tempSecond = events.target.value
        setSecond(tempSecond);
    }

    function checkRegister(userEmail, userPassword, userSecond) {

        // To check if there is some empty input
        if (userEmail == "" || userPassword == "" || userSecond == "") {
            changeErrorMessage("Please fill all form");
            return false;
        }

        // check if email is valid
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let email_is_valid = regex.test(email);
        if (email_is_valid == false) {
            changeErrorMessage("Your email should contain '@' and does not start with symbols");
            return false
        }

        // check if the user email is having the right template
        const result = userEmail.split("@")[1].trim();
        if (result != "sales.com") {
            changeErrorMessage("The only role that is available right now is sales, so it have to end with @sales.com")
            return false;
        }

        if (userPassword.length <= 8) {
            changeErrorMessage("Password length must be longer than 8 character");
            return false
        }

        if (userPassword != userSecond) {
            changeErrorMessage("Password didn't match");
            return false;
        }

        props.addAccount(userEmail, userPassword);

        changeErrorMessage("Account has been successfully added, please login");
        setEmail("");
        setPassword("");
        setSecond("");
        return true;
    }


    return (
        <div className="loginRegister">
            <div className="loginRegisterContainer">
                <h1>Register</h1>

                <div className="inputBoxContainer">
                    <h3>Email (your name followed by your role)</h3>
                    <input type="email" id="email" name="email" value={email} onChange={changeEmail} placeholder="ex: jokowidodo@sales.com" />

                    <h3>Password</h3>
                    <input type="password" id="password" name="password" value={password} onChange={changePassword} />

                    <h3>Confirm Password</h3>
                    <input type="password" id="secondPass" name="secondPass" value={secondpass} onChange={changeSecond} />
                </div>

                <h5 className="errorMessage">{errorMessage}</h5>
            </div>

            <BigButton
                text="Register"
                onClick={() => checkRegister(email, password, secondpass)}
            />

            <h5>Already have an account?</h5>

            <BigButton
                text="Login Here"
                onClick={() => navigate("/")}
            />
        </div>
    )
}

export default Register;

