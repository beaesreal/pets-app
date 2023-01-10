import React, {useContext} from "react";
import { Context } from "../store/appContext";
import RegisterImage from "../../img/Register-image.png";

export const Register = () => {
    const { actions } = useContext(Context);

    const input_username = document.getElementById('username');
    const input_email = document.getElementById('email');
    const input_pass = document.getElementById('password');
    
    return (
        <div>
            <div className="row">
                <div className="col-6 m-5 p-5">
                    <h3 className="my-4">Create account</h3>
                    <form 
                        name="registerUser" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            actions.handleCreateUser(input_username.value, input_email.value, input_pass.value)
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
                            </li>
                        </ul>
                        
                        <div>
                                <button className="btn btn-primary my-2 my-sm-0 px-4 mx-auto" type="submit">Register</button>
                        </div>
                    </form>
                </div>
                <div className="col" style={{width: "auto"}}>
                    <img src={RegisterImage} />
                </div>
            </div>
        </div>
    );
}