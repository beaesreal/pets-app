import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import RegisterImage from "../../img/Register-image.png";

export const Register = () => {
    const { actions } = useContext(Context);

    const input_username = document.getElementById('username');
    const input_email = document.getElementById('email');
    const input_pass = document.getElementById('password');

    const regexUsername = /^[\w]{6,}$/g
    const regexPass = /^[\w!@#\$%\^\&*\)\(+=._-]{6,}$/g
    const regexEmail = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/g

    const checkInputs = (username, email, pass) => {
        if (regexUsername.test(username)) {
            document.getElementById("username").style.borderColor = "green"
            document.getElementById("usernameAnchor").style.display = "none";
        }

        else if (!regexUsername.test(username)) {
            document.getElementById("username").style.borderColor = "red"
            document.getElementById("usernameAnchor").style.display = "block";
        }

        if (regexEmail.test(email)) {
            document.getElementById("email").style.borderColor = "green"
            document.getElementById("emailAnchor").style.display = "none";
        }

        else if (!regexEmail.test(email)) {
            document.getElementById("email").style.borderColor = "red"
            document.getElementById("emailAnchor").style.display = "block";
        }

        if (regexPass.test(pass)) {
            document.getElementById("password").style.borderColor = "green"
            document.getElementById("passwordAnchor").style.display = "none";
        }

        else if (!regexPass.test(pass)) {
            document.getElementById("password").style.borderColor = "red"
            document.getElementById("passwordAnchor").style.display = "block";
        }

        else {actions.handleCreateUser(username, email, pass)}
    }
    
    return (
        <div>
            <div className="row">
                <div className="col m-5 p-5">
                    <h3 className="my-4">Create account</h3>
                    <form 
                        name="registerUser" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            checkInputs(input_username.value, input_email.value, input_pass.value)
                        }}>

                        <ul className="p-0" style={{listStyleType: "none"}}>
                            <li>
                                <input 
                                    id="username" 
                                    type="text" 
                                    name="newUserName" 
                                    placeholder="Username" 
                                    size="60" 
                                    style={{paddingLeft: "0.6rem", paddingTop: "0.3rem", paddingBottom: "0.3rem"}} 
                                    required/>
                                <a id="usernameAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Username must contain at least 6 characters"}</a>
                            </li>
                            <br></br>
                            <li>
                                <input 
                                    id="email" 
                                    type="text" 
                                    name="newEmail" 
                                    placeholder="Email" 
                                    size="60"
                                    style={{paddingLeft: "0.6rem", paddingTop: "0.3rem", paddingBottom: "0.3rem"}}  
                                    required/>
                                <a id ="emailAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Incorrect e-mail format"}</a>
                            </li>
                            <br></br>
                            <li>
                                <input 
                                    id="password" 
                                    type="text" 
                                    name="newPassword" 
                                    placeholder="Password" 
                                    size="60" 
                                    style={{paddingLeft: "0.6rem", paddingTop: "0.3rem", paddingBottom: "0.3rem"}} 
                                    required/>
                                <a id="passwordAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Password must contain at least 6 characters and a special character (&_/%)"}</a>
                            </li>
                        </ul>
                        
                        <div>
                                <button className="btn btn-primary my-2 my-sm-0 px-4 mx-auto" type="submit">Register</button>
                        </div>
                    </form>
                </div>
                <div className="col d-flex justify-content-end" style={{width: "auto"}}>
                    <img src={RegisterImage} />
                </div>
            </div>
        </div>
    );
}