import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import French_Dog_2 from "../../img/French_Dog_2.png";
import { Alert_Popup } from "../component/alert_popup";
import { AlertDeleteUser } from "../component/alertDeleteUser";

export const Register = () => {
    const { actions } = useContext(Context);

    const [inputData, setinputData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleInputChange = (event) => {
        setinputData({
            ...inputData, 
            [event.target.name] : event.target.value
        })
    }

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
                    <h3 className="my-4 pb-3">Create account</h3>
                    <form 
                        name="registerUser" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            checkInputs(inputData['username'], inputData['email'], inputData['password'])
                        }}>

                        <div className="form-group row mx-1" style={{listStyleType: "none"}}>
                                <input 
                                    id="username" 
                                    type="text" 
                                    name="username" 
                                    value={inputData['username']}
                                    placeholder="Username"
                                    onChange={handleInputChange}  
                                    style={{paddingLeft: "0.6rem", paddingTop: "0.3rem", paddingBottom: "0.3rem", maxWidth: "30rem"}} 
                                    required/>
                                <small id="usernameAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Username must contain at least 6 characters"}</small>
                        </div>

                            <br></br>
                            <div className="form-group row mx-1">
                                <input 
                                    id="email" 
                                    type="text" 
                                    name="email"
                                    value={inputData['email']} 
                                    placeholder="Email" 
                                    onChange={handleInputChange}
                                    style={{paddingLeft: "0.6rem", paddingTop: "0.3rem", paddingBottom: "0.3rem", maxWidth: "30rem"}}  
                                    required/>
                                <small id ="emailAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Incorrect e-mail format"}</small>
                            </div>
                            <br></br>
                            <div className="form-group row mx-1">
                                <input 
                                    id="password" 
                                    type="text" 
                                    name="password"
                                    value={inputData['password']}
                                    placeholder="Password" 
                                    onChange={handleInputChange} 
                                    style={{paddingLeft: "0.6rem", paddingTop: "0.3rem", paddingBottom: "0.3rem", maxWidth: "30rem"}} 
                                    required/>
                                <small id="passwordAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Password must contain at least 6 characters and a special character (&_/%)"}</small>
                            </div>
                        <br></br>
                        <div>
                                <button className="btn btn-primary my-2 my-sm-0 px-4 mx-1" type="submit">Register</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-0 d-flex justify-content-center" style={{width: "auto"}}>
                    <img src={French_Dog_2} />
                </div>
            </div>
        </div>
    );
}