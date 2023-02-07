import React, {useState, useContext} from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";


export const ResetPassword = () => {
    const { token } = useParams()
    const { actions } = useContext(Context);
    const [togglePassword, settogglePassword] = useState("password");
    const [ eyeIcon, setEyeIcon ] = useState("fas fa-eye");
    const [inputData, setinputData] = useState({
        pass: '',
        pass2: '',
    });
    
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
        if (pass1 != pass2){
            document.getElementById('pass1').style.borderColor = "red"
            document.getElementById('pass2').style.borderColor = "red"
            document.getElementById('noRepeatPass').style.display = "block"
        }

        else {
            actions.handleResetPassword(token, pass1);
        }
    }

    /*const keyLogin = (e) => {
        if (e.key === 'Enter'){
            actions.handleLogin(inputData['email'], inputData['pass'])
        }
    }*/
    

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
                        </div>

                        <br></br>
                        <small id ="noRepeatPass" style={{display: "none", fontSize: "0.875em", color: "red"}}>{"The passwords do not match. Please try again."}</small>
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
