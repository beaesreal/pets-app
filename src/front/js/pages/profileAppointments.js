import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'
// import Ellipse from "../../img/Ellipse.png";
import 'react-calendar/dist/Calendar.css'
import "../../styles/home.css";

import { Context } from "../store/appContext";
import { Sidebar } from "../component/sidebar";
import PetCard from "../component/petCard";
import EventCard from "../component/eventCard";
import AppointmentCard from "../component/appointmentCard";




export const ProfileAppointments = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [ date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };

    // Show pet info on Cards
    const [pets, setPets] = useState ([])
    const body = document.body;

    // Dark mode
    const theme = localStorage.getItem("theme")
    useEffect (() => {
        if (theme == "dark"){
            body.classList.add(theme);
        } else {
            body.classList.add("light");
        }
    }, [])

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/pet",
            {
                method: "GET",
                mode: 'cors',
                credentials: 'omit',
                headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
                body: null
              })
            const jsonResult = await result.json()

            setPets(jsonResult)
        }

        fetchData();

    }, [])


    //Checks if logged-in
    useEffect (() => {
        const userToken = localStorage.getItem('jwt-token');

        if (!userToken) {navigate("/login")}
        else {navigate('/profile/appointments#information')}

    }, [navigate])


	return (

		<div className="container-fluid p-0">
            <div className="row">
                <div className="col-1">
                    <Sidebar />
                </div>

                <div className="col-11 text-center justify-content-center py-5 col-profile-general">
                    <div className="my-pets">
                    <h1 className="pb-5">Profile</h1>
                    <h2 className="pb-3">My pets</h2>

                    
                        <div className="row justify-content-center">
                            

                            {pets.map ( pets => (
                            <div className="col-sm py-4">
                                <PetCard 
                                    key= {pets.id}
                                    title= {pets.name}
                                    age={pets.age}
                                    //preguntar cómo poner año de nacimiento únicamente o edad del animal
                                    birth= {pets.date_of_birth}
                                    colour= {pets.colour}
                                    breed= {pets.breed}
                                    //preguntar cómo poner imagen cuando es null
                                    //{(img === null) ? "https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg" : pets.img}
                                    img= {"https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg"}
                                    buttonLabel= "More info"
                                    buttonUrl= "/pets"                        
                                />
                            </div>))}

                        </div>
                        <div className="py-5 mx-4">
                            <a href="/create"><strong>Do you want to add another pet? Click here</strong></a>
                        </div>

                        <div className="diets py-5 mx-2">
                    
                    <div className="card text-center mx-3" id="information">
                        <div className="card-header hd-card-profile">
                            <ul className="nav nav-pills card-header-pills">
                            <li className="nav-item mx-3">
                                <a className="nav-link" href="/profile#information">Diets</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link" href="/profile/treatments#information">Treatments</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link active" href="/profile/appointments#information">Appointments</a>
                            </li>
                            </ul>
                        </div>
                        <div className="card-body card-profile">
                            <p className="card-text"><AppointmentCard /></p>
                            <div className="d-flex align-items-left px-4">
                                <a href="/petcare" className="btn btn-primary">Add new appointment</a>
                            </div>
                            
                        </div>
                        </div>
                    </div>


                        <hr className="mt-5"></hr>
                    </div>
                    <div className="appointments">
                    <h2 className="py-5">Events saved</h2>
                        <div className="row">
                            <div className="col-sm align-items-center">
                                <EventCard />
                            </div>
                        </div>
                        <div className="mx-4 mb-5">
                            <a href="/events"><strong>Do you want to add another event on the calendar? Click here</strong></a>
                        </div>
                    </div>



                </div>
            </div>
		</div>
	);
};