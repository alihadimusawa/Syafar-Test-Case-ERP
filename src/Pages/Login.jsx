import React, {useState} from "react";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function changeEmail(events){
        let tempEmail = events.target.value;
        setEmail(tempEmail);
    }

    function changePassword(events){
        let tempPassword = events.target.value;
        setPassword(tempPassword);
    }

    function checkAccount(userEmail, userPassword){
        let accounts = props.listOfAccounts;

        accounts.forEach(account => {
            if (userEmail == account.email){
                if(userPassword == account.password){
                    navigate("/homepage");
                    return true;
                }else{
                    setErrorMessage("Incorrect Password");
                    setPassword("")
                    return false;
                }
            }else{
                setErrorMessage("No account found");
                setEmail("");
                setPassword("");
                return false;
            }
        })
    }

    return (
        <div className="loginRegister">
            <div className="loginRegisterContainer">
                <h1>Login</h1>

                <div className="inputBoxContainer">
                    <h3>Email</h3>
                    <input type="email" id="email" name="email" value={email} onChange={changeEmail} placeholder="jokowidodo@sales.com"/>

                    <h3>Confirm Password</h3>
                    <input type="password" id="password" name="password" value={password} onChange={changePassword} />
                </div>

                <h5 className="errorMessage">{errorMessage}</h5>
            </div>

            <BigButton
                text="Login"
                onClick={(() => checkAccount(email, password))}
            />

            <h5>Don't have an account yet?</h5>

            <BigButton
                text="Register Here"
                onClick={() => navigate("/register")}
            />
        </div>
    )
}

export default Login;