import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import PetImage from "../../img/Pet-image.png";
import Placeholder_APP_Logo from "../../img/Placeholder_APP_Logo.png";

export const Login = () => {
    const { actions } = useContext(Context);
    const [togglePassword, settogglePassword] = useState("password");
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
        }
        else {settogglePassword("password")}
    }

    const keyLogin = (e) => {
        if (e.key === 'Enter'){
            actions.handleLogin(inputData['email'], inputData['pass'])
        }
    }
    

    return (
        <div className="row">
            <div className="d-flex justify-content-center my-5 text-center">
                <img className="img-fluid" src={Placeholder_APP_Logo} style={{margin: "auto", width: "200px"}}/> 
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
                        <input 
                            id="pass" 
                            className="form-control"
                            type={togglePassword} 
                            name="pass" 
                            placeholder="Password" 
                            onChange={handleInputChange}
                            style={{textAlign: "center", maxWidth: "20rem", margin: "auto"}} 
                            onKeyUp={() => {keyLogin}}
                            required/>
                        <i className="glyphicon glyphicon-eye-open form-control-feedback has-feedback-right" id="togglePassword" style={{}} onClick={showPassword}></i>
                        <i className="far fa-eye" id="togglePassword" style={{marginLeft: "-1.75rem"}} onClick={showPassword}></i>
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
                            Don't have an account? <a href="/signup">Click Here</a>
                        </p>
                    </div>
            </form>
        </div>
    )
}
