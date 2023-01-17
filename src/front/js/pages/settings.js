import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'
// import Ellipse from "../../img/Ellipse.png";
import 'react-calendar/dist/Calendar.css'
import "../../styles/home.css";

import { Context } from "../store/appContext";

import { Sidebar } from "../component/sidebar";
import { Calendar } from "../component/calendar";

import PetCard from "../component/petCard";


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
                            <div className="col-8 px-5 pt-4">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1"/><p>Dark Mode</p>
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
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="**********" />
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
                            <button className="btn btn-danger" onClick={actions.handleDeleteUser}>Click here to delete your account</button>

                            </div>
                            
                        </div>

                    </div>

                </div>
            </div>
		</div>
	);
};
