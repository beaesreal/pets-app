import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import French_Dog_2 from "../../img/French_Dog_2.png";

export const Register = () => {
    // Global variables and functions
    const { store, actions } = useContext(Context);

    // Local states for validation and icon for password
    const [ eyeIcon, setEyeIcon ] = useState("fas fa-eye");
    const [togglePassword, settogglePassword] = useState("password");
    const [ checkRegex, setCheckRegex ] = useState(false)

    const [inputData, setinputData] = useState({
        username: '',
        email: '',
        password: '',
    })

    // Regex variables for validation
    const regexUsername = /^[\w]{6,}$/g
    const regexPass = /^[\w]{6,}[\ñ\!@#\$%\^\&*\)\(+=._-]{1,}$/g
    const regexEmail = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/g

    

    // After Regex validation goes to backend
    useEffect (() => {
        if (checkRegex === false) {
            console.log("useEffect: checkRegex is -> ", checkRegex)
        }

        else {
            console.log("useEffect: checkRegex is -> ", checkRegex)
            actions.handleCreateUser(inputData['username'], inputData['email'], inputData['password']);
            setCheckRegex(false);
        }

    }, [checkRegex])


    // Inform user about data duplicates after check in the back
    useEffect (() => {
        const username_exists = store.username_exists
        console.log('This is the backCheckUser function')
        console.log('username exists?', username_exists)

        if (store.username_exists === true){
            document.getElementById("username").style.borderColor = "red"
            document.getElementById("usernameExists").style.display = "block";
        }

        else {
            document.getElementById("username").style.borderColor = "#ced4da"
            document.getElementById("usernameExists").style.display = "none";
        }

    }, [store.username_exists])

    useEffect (() => {
        const email_exists = store.email_exists
        console.log('This is the backCheckEmail function')
        console.log('email exists?', email_exists)

        if (store.email_exists === true){
            document.getElementById("email").style.borderColor = "red"
            document.getElementById("emailExists").style.display = "block";
        }

        else {
            document.getElementById("email").style.borderColor = "#ced4da"
            document.getElementById("emailExists").style.display = "none";
        }

    }, [store.email_exists])

    // Sets all inputs values
    const handleInputChange = (event) => {
        setinputData({
            ...inputData, 
            [event.target.name] : event.target.value
        })
    }

    // Show/Hide password and changes eye icon on click
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

    //Regex validation
    const checkInputsRegex = (username, email, pass) => {
        if (regexUsername.test(username)) {
            document.getElementById("usernameAnchor").style.display = "none";
        }

        else if (!regexUsername.test(username)) {
            document.getElementById("username").style.borderColor = "red"
            document.getElementById("usernameAnchor").style.display = "block";
        }

        if (regexEmail.test(email)) {
            document.getElementById("emailAnchor").style.display = "none";
        }

        else if (!regexEmail.test(email)) {
            document.getElementById("email").style.borderColor = "red"
            document.getElementById("emailAnchor").style.display = "block";
        }

        if (regexPass.test(pass)) {
            document.getElementById("passwordAnchor").style.display = "none";
        }

        else if (!regexPass.test(pass)) {
            document.getElementById("password").style.borderColor = "red"
            document.getElementById("passwordAnchor").style.display = "block";
        }

        else {setCheckRegex(true);}
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
                            checkInputsRegex(inputData['username'], inputData['email'], inputData['password'])
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
                                <small id ="usernameExists" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Introduced username already exists"}</small>
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
                                <small id ="emailExists" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Introduced e-mail already exists"}</small>
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
                                </div>
                                <small id="passwordAnchor" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"Password must contain at least 6 characters and a special character (&_/%)"}</small>
                            </div>
                        <br></br>
                        <div>
                                <button className="btn btn-primary my-2 my-sm-0 px-4 mx-1" type="submit">Register</button>
                        </div>
                        <br></br>
                        <br></br>
                        <small style={{display: "block", fontSize: "1em"}}>{"Already have an account? Log-in "}<a href='/login' style={{color: "darkblue", textDecoration: "underline"}}>HERE</a></small>
                    </form>
                </div>
                <div className="col-sm d-flex object-fit-contain" style={{maxHeight:"600px"}}>
                    <img className="object-fit-cover" src={French_Dog_2} style={{width:"100%", objectFit:"cover",}} />
                </div>
            </div>
        </div>
    );
}