import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'
// import Ellipse from "../../img/Ellipse.png";
import 'react-calendar/dist/Calendar.css'
import "../../styles/home.css";

import { Context } from "../store/appContext";

import { Sidebar } from "../component/sidebar";
import { Calendar } from "../component/calendar";
import PetCard from "../component/petCard";

import DarkMode from "../component/darkMode";



export const Events = () => {
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
        else {navigate('/Events')}

    }, [navigate])


	return (

		<div className="container-fluid p-0">
            <div className="row">
                <div className="col-1">
                    <Sidebar />
                </div>
                

                <div className="col-11 text-center justify-content-center pt-5 px-0">
                    <div className="my-pets">
                    <h1 className="">Events</h1>
                    <div className="d-flex justify-content-center">
                        <Calendar />
                    </div>
                    </div>
                </div>
            </div>
		</div>
	);
};