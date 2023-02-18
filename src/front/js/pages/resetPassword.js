import React, {useState, useContext, useEffect} from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";


export const ResetPassword = () => {
    const { token } = useParams()
    const { actions } = useContext(Context);
    const [togglePassword, settogglePassword] = useState("password");
    const [ eyeIcon, setEyeIcon ] = useState("fas fa-eye");
    const [ checkRegex, setCheckRegex ] = useState(false);
    const [inputData, setinputData] = useState({
        pass1: '',
        pass2: '',
    });
    
    const regexPass = /^[\w]{6,}[\ñ\!@#\$%\^\&*\)\(+=._-]{1,}$/g

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

    const handleNewPasswords = (pass1, pass2) => {
        console.log("pass1: ", pass1)
        console.log("pass2: ", pass2)

        console.log('Check pass1: ', regexPass.test(pass1))

        if (regexPass.test(pass1)){
            document.getElementById('pass1').style.borderColor = "#ced4da"
            document.getElementById('passwordAnchor1').style.display = "none"
        }

        else if (!regexPass.test(pass1)){
            document.getElementById('pass1').style.borderColor = "red"
            document.getElementById('passwordAnchor1').style.display = "block"
        }

        console.log('Check pass2: ', regexPass.test(pass2))

        if (regexPass.test(pass2)){
            document.getElementById('pass2').style.borderColor = "#ced4da"
            document.getElementById('passwordAnchor2').style.display = "none"
        }

        else if (!regexPass.test(pass2)){
            document.getElementById('pass2').style.borderColor = "red"
            document.getElementById('passwordAnchor2').style.display = "block"
        }

        if (pass1 != pass2){
            document.getElementById('pass1').style.borderColor = "red"
            document.getElementById('pass2').style.borderColor = "red"
            document.getElementById('noRepeatPass').style.display = "block"
        }

        else {setCheckRegex(true);}
    }

    /*const keyLogin = (e) => {
        if (e.key === 'Enter'){
            actions.handleLogin(inputData['email'], inputData['pass'])
        }
    }*/

    useEffect (() => {
        if (checkRegex === false) {
            console.log("useEffect: checkRegex is -> ", checkRegex)
        }

        else {
            console.log("useEffect: checkRegex is -> ", checkRegex)
            actions.handleResetPassword(token, inputData['pass1']);
            //actions.handleCreateUser(inputData['username'], inputData['email'], inputData['password']);
            setCheckRegex(false);
        }

    }, [checkRegex])
    

    return (
        <div style={{padding: "10rem"}}>
            <div className="row d-flex text-center">
                <h3 className="mt-4 mt-5 px-5">Reset Password</h3>
            </div>
            <div className="row">
                <form 
                    name="myForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleNewPasswords(inputData['pass1'], inputData['pass2'])
                    }}
                    >
                    
                    <div className="col d-flex justify-content-center p-2">
                        <label for="pass1" className="form-label" style={{margin: "auto"}}>New password: </label><br></br>
                    </div>
                        <div className="col">
                            <div className="input-group d-flex justify-content-center">
                                <input 
                                    id="pass1" 
                                    className="form-control"
                                    type={togglePassword}
                                    name="pass1" 
                                    placeholder="Write here" 
                                    onChange={handleInputChange} 
                                    style={{textAlign: "center", maxWidth: "30rem"}} 
                                    required/>

                                <span className="input-group-text bg-transparent" style={{marginLeft: "-2.7rem", zIndex: "100", border: "none"}}>
                                    <i className={eyeIcon} id="togglePassword" style={{cursor: "pointer"}} onClick={() => showPassword()}></i>
                                </span>
                            </div>
                            <small id="passwordAnchor1" style={{display: "none", fontSize: "0.875em", color: "red", textAlign: "center"}}>{"Password must contain at least 6 characters and a special character (&_/%)"}</small>
                        </div>

                        <br></br>

                        <div className="col d-flex justify-content-center">
                            <label for="pass2" class="form-label">Repeat new password: </label>
                        </div>
                        <div className="col">
                            <div className="input-group d-flex justify-content-center">
                                
                                <input 
                                    id="pass2" 
                                    className="form-control"
                                    type={togglePassword} 
                                    name="pass2" 
                                    placeholder="Write here" 
                                    onChange={handleInputChange}
                                    style={{textAlign: "center", maxWidth: "30rem"}} 
                                    required/>
                                
                                <span className="input-group-text bg-transparent" style={{marginLeft: "-2.7rem", zIndex: "100", border: "none"}}>
                                    <i className={eyeIcon} id="togglePassword" style={{cursor: "pointer"}} onClick={() => showPassword()}></i>
                                </span>
                            </div>
                            <small id="passwordAnchor2" style={{display: "none", fontSize: "0.875em", color: "red", textAlign: "center"}}>{"Password must contain at least 6 characters and a special character (&_/%)"}</small>
                        </div>

                        <br></br>
                        <small id ="noRepeatPass" style={{display: "none", fontSize: "0.875em", color: "red", textAlign: "center"}}>{"The passwords do not match. Please try again."}</small>
                        <br></br>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary px-4" type="submit" style={{margin: "auto"}}>Reset Password</button>
                        </div>

                        <br></br>
                    
                </form>
            </div>
        </div>
    )
}
