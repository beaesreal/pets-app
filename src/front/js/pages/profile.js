import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'
import Ellipse from "../../img/Ellipse.png";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

import { Context } from "../store/appContext";

import { Sidebar } from "../component/sidebar";



export const Profile = () => {
	const { store, actions } = useContext(Context);
    const [ date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };

	return (

		<div className="container-fluid p-0">
            <Sidebar />
            <div className="row">
            




                <div className="container text-center px-5">
                    <div className="">
                        <h5><strong>
                            My pets
                        </strong></h5>
                    </div>
                    <div className="d-flex text-center">
                        <div className="card pet-card m-2 text-center">
                            <img className="card-img-top w-50 h-50" src="https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head.jpg" class="d-inline-block align-top" alt="" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Pet name</h5>
                                <a href="#" class="btn btn-primary">More details</a>
                            </div>
                        </div>
                        <div className="card pet-card m-2">
                            <img className="card-img-top w-50 h-50" src="https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg" class="d-inline-block align-top" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">Pet name</h5>
                                <a href="#" class="btn btn-primary">More details</a>
                            </div>
                        </div>
                        <div className="card pet-card m-2">
                            <img className="card-img-top" src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg" class="d-inline-block align-top" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">Pet name</h5>
                                <a href="#" class="btn btn-primary">More details</a>
                            </div>
                        </div>
                    
                    </div>
                    <div className="pt-2">
                        <a href="/"><strong>Do you want to add another pet? Click here</strong></a>
                    </div>

                    <div className="py-5">
                        <h5><strong>
                            Appointments
                        </strong></h5>
                        <div className="row">
                            <div className="col">
                                <p><strong>
                                    Appointments this month
                                </strong></p>
                                <Calendar onChange={onChange} value={date}/>
                                {console.log(date)}
                            </div>
                            <div className="col">
                                <p><strong>
                                    Next appointment
                                </strong></p>
                            </div>

                        </div>
                    </div>

                    <div className="py-5">
                        <div>
                            <h5><strong>
                                Saved diets
                            </strong></h5>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Diet for Pet 1
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Diet for Pet 2</a>
                                <a class="dropdown-item" href="#">Diet for Pet 3</a>
                                <a class="dropdown-item" href="#">Diet for Pet 4</a>
                            </div>
                            </div>
                    </div>


                </div>
                
            </div>

		</div>
	);
};
