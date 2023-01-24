import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import PetImage from "../../img/Pet-image.png";

export const Login = () => {
    const { actions } = useContext(Context);
    const [togglePassword, settogglePassword] = useState("password");
    const [ eyeIcon, setEyeIcon ] = useState("fas fa-eye");
    const [inputData, setinputData] = useState({
        email: '',
        pass: '',
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

    const keyLogin = (e) => {
        if (e.key === 'Enter'){
            actions.handleLogin(inputData['email'], inputData['pass'])
        }
    }
    

    return (
        <div className="row">
            <div className="d-flex justify-content-center my-5 text-center">
                <img className="img-fluid" src={PetImage} style={{margin: "auto"}}/> 
            </div>
            <form 
                name="myForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    actions.handleLogin(inputData['email'], inputData['pass'])
                }}
                >
                    <div className="form-group has-feedback justify-content-center">
                        <input 
                            id="email" 
                            className="form-control"
                            type="text" 
                            name="email" 
                            placeholder="Email or Username" 
                            onChange={handleInputChange} 
                            style={{textAlign: "center", maxWidth: "20rem", margin: "auto"}} 
                            required/>
                    <br></br>
                        <div className="input-group d-flex justify-content-center">
                            <input 
                                id="pass" 
                                className="form-control"
                                type={togglePassword} 
                                name="pass" 
                                placeholder="Password" 
                                onChange={handleInputChange}
                                style={{textAlign: "center", maxWidth: "20rem"}} 
                                onKeyUp={() => {keyLogin}}
                                required/>
                            
                            <span className="input-group-text bg-transparent" style={{marginLeft: "-2.7rem", zIndex: "100", border: "none"}}>
                                <i className={eyeIcon} id="togglePassword" style={{cursor: "pointer"}} onClick={() => showPassword()}></i>
                            </span>
                        </div>
                    <br></br>
                        <a 
                            id="loginError" 
                            className="text-center" 
                            style={{
                                display: "none", 
                                textDecoration: "none", 
                                fontSize: "0.875em", 
                                color: "red"}}>
                            
                            {"E-mail/Username or Password incorrect"}
                        </a>
                    </div>
                    <br></br>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary px-4" type="submit" style={{margin: "auto"}}>Log in</button>
                    </div>
                    <br></br>
                    <div className="d-flex justify-content-center">    
                        <p>
                            Don't have an account? <a href="https://3000-4geeksacade-reactflaskh-iny5xmevfgu.ws-eu77.gitpod.io/signup">Click Here</a>
                        </p>
                    </div>
            </form>
        </div>
    )
}
