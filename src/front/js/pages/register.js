import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import French_Dog_2 from "../../img/French_Dog_2.png";
import { AlertDeleteUser } from "../component/alertDeleteUser";

export const Register = () => {
    const { actions } = useContext(Context);

    const [ eyeIcon, setEyeIcon ] = useState("fas fa-eye");
    const [togglePassword, settogglePassword] = useState("password");
    const [ checkUser, setCheckUser ] = useState(true)
    const [ checkEmail, setCheckEmail ] = useState(true)
    const [ checkPass, setCheckPass ] = useState(true)

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

    const showPassword = () => {
        if (togglePassword === "password"){
            settogglePassword("text");
            setEyeIcon("fas fa-eye-slash");
        }
        else {
            settogglePassword("password");
            setEyeIcon("fas fa-eye");
        }
    }

    const regexUsername = /^[\w]{6,}$/g
    const regexPass = /^[\w]{6,}[!@#\$%\^\&*\)\(+=._-]{1,}$/g
    const regexEmail = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/g

    const checkInputs = (username, email, pass) => {
        if (regexUsername.test(username)) {
            //document.getElementById("username").style.borderColor = "green"
            document.getElementById("usernameAnchor").style.display = "none";
            setCheckUser(true);
        }

        else if (!regexUsername.test(username)) {
            document.getElementById("username").style.borderColor = "red"
            document.getElementById("usernameAnchor").style.display = "block";
            setCheckUser(false);
        }

        if (regexEmail.test(email)) {
            //document.getElementById("email").style.borderColor = "green"
            document.getElementById("emailAnchor").style.display = "none";
            setCheckEmail(true);
        }

        else if (!regexEmail.test(email)) {
            document.getElementById("email").style.borderColor = "red"
            document.getElementById("emailAnchor").style.display = "block";
            setCheckEmail(false);
        }

        if (regexPass.test(pass)) {
            document.getElementById("password").style.borderColor = "green"
            document.getElementById("passwordAnchor").style.display = "none";
            setCheckPass(true);
        }

        else if (!regexPass.test(pass)) {
            document.getElementById("password").style.borderColor = "red"
            document.getElementById("passwordAnchor").style.display = "block";
            setCheckPass(false);
        }

        if(checkUser && checkEmail && checkPass) {actions.handleCreateUser(username, email, pass)}
        if (!checkUser || !checkEmail || !checkPass) {
            document.getElementById("username").style.borderColor = "red"
            document.getElementById("email").style.borderColor = "red"
            document.getElementById("password").style.borderColor = "red"
            document.getElementById("existsNone").style.display = "block"
        }
    }
    
    return (
        <div>
            <div className="row">
                <div className="col-sm m-lg-5 ">
                    <h3 className="mt-4 mt-5 px-5">Create account</h3>
                    <form 
                        className="p-5"
                        name="registerUser" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            checkInputs(inputData['username'], inputData['email'], inputData['password'])
                        }}>

                        <div className="form-group row mx-1" style={{listStyleType: "none"}}>
                                <input 
                                    id="username" 
                                    type="text" 
                                    className="form-control"
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
                                    className="form-control"
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
                                <div className="input-group p-0">
                                    <input 
                                        id="password" 
                                        type={togglePassword}
                                        className="form-control"
                                        name="password"
                                        value={inputData['password']}
                                        placeholder="Password" 
                                        onChange={handleInputChange} 
                                        style={{paddingLeft: "0.5rem", paddingTop: "0.3rem", paddingBottom: "0.3rem", maxWidth: "30rem"}} 
                                        required/>
                                    <span className="input-group-text bg-transparent rounded" style={{marginLeft: "-2.7rem", zIndex: "100", border: "none"}}>
                                    <i className={eyeIcon} id="togglePassword" style={{cursor: "pointer"}} onClick={() => showPassword()}></i>
                                </span>
                                    <small id="passwordAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Password must contain at least 6 characters and a special character (&_/%)"}</small>
                            
                                
                                </div>
                            </div>
                        <br></br>
                        <div>
                                <button className="btn btn-primary my-2 my-sm-0 px-4 mx-1" type="submit">Register</button>
                        </div>
                        <br></br>
                        <small id="existsNone" style={{display: "none", fontSize: "1em", color: "red"}}>{"Username or email already exists"}</small>
                    </form>
                </div>
                <div className="col-sm d-flex object-fit-contain" style={{maxHeight:"600px"}}>
                    <img className="object-fit-cover" src={French_Dog_2} style={{width:"100%", objectFit:"cover",}} />
                </div>
            </div>
        </div>
    );
}