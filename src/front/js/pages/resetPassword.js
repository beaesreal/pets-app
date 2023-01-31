import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";


export const Login = () => {
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

    /*const keyLogin = (e) => {
        if (e.key === 'Enter'){
            actions.handleLogin(inputData['email'], inputData['pass'])
        }
    }*/
    

    return (
        <div className="row">
            <h3 className="mt-4 mt-5 px-5">Reset Password</h3>
            <form 
                name="myForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    actions.handleLogin(inputData['email'], inputData['pass'])
                }}
                >
                    <div className="input-group d-flex justify-content-center">
                        <label for="pass1" class="form-label">New password: </label>
                        <input 
                            id="pass1" 
                            className="form-control"
                            type={togglePassword}
                            name="pass1" 
                            placeholder="Email or Username" 
                            onChange={handleInputChange} 
                            style={{textAlign: "center", maxWidth: "20rem", margin: "auto"}} 
                            required/>

                        <span className="input-group-text bg-transparent" style={{marginLeft: "-2.7rem", zIndex: "100", border: "none"}}>
                            <i className={eyeIcon} id="togglePassword" style={{cursor: "pointer"}} onClick={() => showPassword()}></i>
                        </span>
                    <br></br>
                        <div className="input-group d-flex justify-content-center">
                            <label for="pass2" class="form-label">Repeat new password: </label>
                            <input 
                                id="pass2" 
                                className="form-control"
                                type={togglePassword} 
                                name="pass2" 
                                placeholder="Password" 
                                onChange={handleInputChange}
                                style={{textAlign: "center", maxWidth: "20rem"}} 
                                required/>
                            
                            <span className="input-group-text bg-transparent" style={{marginLeft: "-2.7rem", zIndex: "100", border: "none"}}>
                                <i className={eyeIcon} id="togglePassword" style={{cursor: "pointer"}} onClick={() => showPassword()}></i>
                            </span>
                        </div>
                    <br></br>
                        <div className="d-flex justify-content-center">
                        <ModalResetPassword />
                        </div>
                    </div>
                    <br></br>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary px-4" type="submit" style={{margin: "auto"}}>Reset Password</button>
                    </div>
                    <br></br>
            </form>
                    
        </div>
    )
}
