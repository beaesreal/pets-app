import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'
// import Ellipse from "../../img/Ellipse.png";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import "../../styles/home.css";

import { Context } from "../store/appContext";

import { Sidebar } from "../component/sidebar";
import PetCard from "../component/petCard";

import DarkMode from "../component/darkMode";


export const Profile = () => {
	const { store, actions } = useContext(Context);
    const [ date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };

    // Show pet info on Cards
    const [pets, setPets] = useState ([])
    const body = document.body;
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

	return (

		<div className="container-fluid p-0">
            <div className="row">
                <div className="col-1">
                    <Sidebar />
                </div>

                <div className="col-11 text-center justify-content-center py-5 px-5">
                    <div className="my-pets">
                    <h1 className="pb-5">Profile</h1>
                    <h2>My pets</h2>
                        <div className="row">
                            

                            {pets.map ( pets => (
                            <div className="pet-info-col col-sm py-4 mx-3">
                                <PetCard 
                                    key= {pets.id}
                                    title= {pets.name}
                                    //preguntar cómo poner año de nacimiento únicamente o edad del animal
                                    birth= {pets.date_of_birth}
                                    colour= {pets.colour}
                                    //preguntar cómo poner imagen cuando es null
                                    //{(img === null) ? "https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg" : pets.img}
                                    img= {"https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg"}
                                    buttonLabel= "More info"
                                    buttonUrl= "/pets"                        
                                />
                            </div>))}

                        </div>
                        <div className="pt-5 mx-4">
                            <a href="/create"><strong>Do you want to add another pet? Click here</strong></a>
                        </div>
                        <hr className="mt-5"></hr>
                    </div>
                    <div className="appointments">
                    <h2 className="py-5">Appointments</h2>
                        <div className="row">
                            <div className="col-sm align-items-center">
                                <h5>Calendar</h5>
                                <Calendar onChange={onChange} value={date}/>
                                {console.log(date)}
                            </div>
                            <div className="col-sm">
                                <h5>Next appointments</h5>
                                <p>Appointment 1</p>
                                <p>Appointment 2</p>
                            </div>
                        </div>

                    </div>
                    <hr className="mt-5"></hr>
                    <div className="diets">
                    <h2 className="py-5">Diets</h2>
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