import React, {useContext} from "react";
import { Context } from "../store/appContext";
import PetImage from "../../img/Pet-image.png";

export const Login = () => {
    const { actions } = useContext(Context);

    const input_email = document.getElementById('email');
    const input_pass = document.getElementById('pass');

    return (
        <div>
            <div className="d-flex justify-content-center my-5 text-center">
                <img className="img-fluid" src={PetImage} style={{marginLeft: "1.5em"}}/> 
            </div>
            <form 
                name="myForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    actions.handleLogin(input_email.value, input_pass.value)
                }}
                >
                    <div className="d-flex justify-content-center">
                        <ul style={{listStyleType: "none"}}>
                            <li>
                                <input 
                                    id="email" 
                                    type="text" 
                                    name="femail" 
                                    placeholder="Email or Username" 
                                    size="40" 
                                    style={{textAlign: "center"}} 
                                    required/>
                            </li>
                            <br></br>
                            <li>
                                <input 
                                    id="pass" 
                                    type="text" 
                                    name="fpass" 
                                    placeholder="Password" 
                                    size="40" 
                                    style={{textAlign: "center"}} 
                                    required/>
                            </li>
                            <br></br>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul style={{listStyleType: "none"}} className="d-flex justify-content-center">
                            <li>
                                <button className="btn btn-primary my-2 my-sm-0 px-4 mx-auto" type="submit">Log in</button>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-center">    
                        <ul style={{listStyleType: "none"}} className="d-flex justify-content-center">
                            <li>
                                <p>
                                    Don't have an account? <a href="https://3000-4geeksacade-reactflaskh-iny5xmevfgu.ws-eu77.gitpod.io/signup">Click Here</a>
                                </p>
                            </li>
                        </ul>
                    </div>
            </form>
        </div>
    )
}
