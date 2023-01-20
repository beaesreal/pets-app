import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPen } from 'react-icons/fa'
// import Ellipse from "../../img/Ellipse.png";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import "../../styles/home.css";

import { Context } from "../store/appContext";

import { Sidebar } from "../component/sidebar";
import PetDetails from "../component/petDetails";


export const Detail = () => {
	const { store, actions } = useContext(Context);
    const [ date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };

    // Dark & light theme check
	const body = document.body;
    const theme = localStorage.getItem("theme")
    useEffect (() => {
        if (theme == "dark"){
            body.classList.add(theme);
        } else {
            body.classList.add("light");
        }
    }, [])

    // Show pet info Details
    const [pets, setPets] = useState ([])

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
                    <h1 className="pb-5">Pets</h1>
                        
                            

                            {pets.map ( pets => (
                            <div className="pet-info-container py-4 mx-auto rounded">
                                <PetDetails 
                                    key= {pets.id}
                                    title= {pets.name}
                                    //preguntar cómo poner año de nacimiento únicamente o edad del animal
                                    birth= {pets.date_of_birth}
                                    colour= {pets.colour}
                                    gender= {pets.gender}
                                    id= {pets.id}
                                    //preguntar cómo poner imagen cuando es null
                                    //{(img === null) ? "https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg" : pets.img}
                                    img= {"https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg"}
                                    buttonLabel= "Edit this pet"
                                    buttonUrl= "/details"                        
                                />
                            </div>))}

                        
                        <div className="pt-5 mx-4">
                            <a href="/create"><strong>Do you want to add another pet? Click here</strong></a>
                        </div>
                        <a href="/profile"><button className="btn btn-primary my-5"><FaArrowLeft /> Go to my profile</button></a>
                    </div>

                </div>
            </div>
		</div>
	);
};