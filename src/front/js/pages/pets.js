import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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

            console.log(jsonResult)

            setPets(jsonResult)
        }

        fetchData();

    }, [])


    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }

        return age
    }
    
    // const dateNoTime = (birthday) => {
    //     let newBirthdayDate = birthday.getFullYear()

    //     return newBirthdayDate
    // }

    //Checks if logged-in
    useEffect (() => {
        const userToken = localStorage.getItem('jwt-token');

        if (!userToken) {navigate("/login")}

    }, [navigate])

	return (

		<div className="container-fluid p-0">
            <div className="row">
                <div className="col-1">
                    <Sidebar />
                </div>

                <div className="col-11 text-center justify-content-center py-5 px-5">
                    <div className="my-pets">
                    <h1 className="pb-5">Pets</h1>
                        
                        <div className="container d-flex justify-content-center align-items-center">
                            <div className="row justify-content-center">

                            {pets.map ( pet => (
                            <div className="pet-info-container py-4" >
                                <PetDetails 
                                    key= {pet.id}
                                    title= {pet.name}
                                    age= {getAge(pet.date_of_birth)}
                                    species = {pet.species}
                                    breed={pet.breed}
                                    colour= {pet.colour}
                                    gender= {pet.gender}
                                    id= {pet.id}
                                    caracteristics = {pet.caracteristics}
                                    img={pet.image}
                                    buttonLabel= "Edit this pet"
                                    buttonUrl= "/details"                        
                                />
                            </div>))}
                            </div>            
                        </div>
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