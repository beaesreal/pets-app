import React, { useState, useEffect, useContext, addEventListener } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'
import "../../styles/home.css";

import { Context } from "../store/appContext";
import { Sidebar } from "../component/sidebar";
import DarkMode from "../component/darkMode";
import { Alert_Popup } from "../component/alert_popup";


export const Settings = () => {
	const { store, actions } = useContext(Context);
    const [ date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };


    // GET User info to show on Settings page

    const [users, setUsers] = useState ([])

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/user")
            const jsonResult = await result.json()

            setUsers(jsonResult)
        }

        fetchData();

    }, [])

	return (

		<div className="container-fluid p-0">
            <div className="row">
                <div className="col-1">
                    <Sidebar />
                </div>

                <div className="col-11 justify-content-center py-5 px-5">
                    <div className="settings">
                    <h1 className="pb-5 px-5 text-center">Settings</h1>

                        <div className="row px-5">

                            <div className="col">
                                <h4>Basic info</h4>                             
                            </div>
                              
                            <hr className="my-3"></hr>

                        </div>

                        <div className="container px-5 pt-4">       
                        <form>
                            {users.map (user =>
                            <div class="form-group">
                                
                                <div className="py-2">
                                    <label for="exampleInputEmail1">Username</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={user.username} />
                                </div>
                                <div className="py-2">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={user.email} />
                                </div>
                                <div className="py-2">
                                    <small id="emailHelp" class="form-text text-muted">Write another name and then, press the button below "Save" to update your changes.</small>
                                </div>

                            </div>)}
                            <div className="py-4">
                                <button type="submit" class="btn btn-primary">Save changes</button> 
                            </div>
                        </form>
                        </div>


                        <div className="visualization pt-5">
                            <div className="row px-5">
                                <div className="">
                                    <h4>Visualization</h4>                             
                                </div>                               
                                <hr className="my-3"></hr>
                            </div>
                        </div>

                        <div className="row px-3">
                            <div className="d-flex p-5">
                            <DarkMode />
                            <div className="px-3 pt-2">
                                <p>Click the button to switch between light and dark mode.</p>
                            </div>
                            </div>
                        </div>

                        <div className="visualization pt-5">
                            <div className="row px-5">
                                <div className="">
                                    <h4>Security</h4>                             
                                </div>                               
                                <hr className="my-3"></hr>
                            </div>
                            <div className="container px-5 pt-4">       
                        <form>
                            {users.map (user =>
                            <div class="form-group">
                                
                                <div className="py-2">
                                    <label for="exampleInputEmail1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="**********" />
                                </div>

                            </div>)}
                            <div className="py-4">
                                <button type="submit" class="btn btn-primary">Set new password</button> 
                            </div>
                        </form>
                        </div>


                        </div>


                        <div className="visualization pt-5">
                            <div className="row px-5">
                                <div className="">
                                    <h4>Delete account</h4>                             
                                </div>                               
                                <hr className="my-3"></hr>
                            </div>
                            <div className="px-5">
                            <button className="btn btn-danger px-3" onClick={actions.handleDeleteUser}><FaTrash className="mx-2 my-2" />Click here to delete your account</button>

                            </div>
                            
                        </div>

                    </div>

                </div>
            </div>
		</div>
	);
};