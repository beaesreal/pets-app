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


export const PetCare = () => {
	const { store, actions } = useContext(Context);
    const [ date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };

    // Show pet info on Cards
    const body = document.body;
    const theme = localStorage.getItem("theme")
    useEffect (() => {
        if (theme == "dark"){
            body.classList.add(theme);
        } else {
            body.classList.add("light");
        }
    }, [])

    // DIET

    const [dietInfo, setDietInfo] = useState({
        foodname:'',
        quantity:'',
        times_a_day:'',
    })

    const [medicineInfo, setMedicineInfo] = useState({
        name:'',
        quantity:'',
        times_a_day:'',
    })

    const [appointmentInfo, setAppointmentInfo] = useState({
        date:'',
        veterinarian:'',
    })

    const handleInputDiet= (event) => {
        // console.log(event.target.value)
        setDietInfo({
            ...dietInfo, 
            [event.target.name] : event.target.value
        })
    }

    const handleInputMedicine= (event) => {
        // console.log(event.target.value)
        setMedicineInfo({
            ...medicineInfo, 
            [event.target.name] : event.target.value
        })
    }
    
    const handleInputAppointment= (event) => {
        // console.log(event.target.value)
        setAppointmentInfo({
            ...appointmentInfo, 
            [event.target.name] : event.target.value
        })
    }


    // SEND DATA

    const sendDietData = async (event) => {
        event.preventDefault()
        
        console.log(dietInfo.foodname + " " + dietInfo.quantity + " " + dietInfo.times_a_day)

        let jsonBody;

        jsonBody = {
            'foodname': dietInfo.foodname,
            'quantity': dietInfo.quantity, 
            'times_a_day': dietInfo.times_a_day,        
            }

        const resp = await fetch(
            process.env.BACKEND_URL + "/diet/create",
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(jsonBody),
            }
          )

    }


    const sendMedicineData = async (event) => {
        event.preventDefault()
        
        let jsonBody;

        jsonBody = {
            'name': medicineInfo.foodname,
            'quantity': medicineInfo.quantity, 
            'times_a_day': medicineInfo.times_a_day,        
            }

        const resp = await fetch(
            process.env.BACKEND_URL + "/medicine/create",
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(jsonBody),
            }
          )

    }

    const sendAppointmentData = async (event) => {
        event.preventDefault()
        
        let jsonBody;

        jsonBody = {
            'date': appointmentInfo.date,
            'veterinarian': appointmentInfo.veterinarian,      
            }

        const resp = await fetch(
            process.env.BACKEND_URL + "/appointment/create",
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(jsonBody),
            }
          )

    }

    

	return (

		<div className="container-fluid p-0">
            <div className="row">
                <div className="col-1">
                    <Sidebar />
                </div>

                <div className="col-11 text-center justify-content-center py-5 px-5">
                    <div className="diet">
                    <h1 className="pb-5">Pet Care</h1>
                    <h2 className="py-3">Diet</h2>
                    <form onSubmit={sendDietData}>
                        <div className="row">
                        
                        <input 
                            className='form-control col-sm mx-2' 
                            type='text' name='foodname' 
                            placeholder='Food Name' 
                            onChange={handleInputDiet}/>
                        
                        <input  
                            className='form-control col-sm mx-2' 
                            type='text' name='quantity' 
                            placeholder='Quantity (grs)' 
                            onChange={handleInputDiet}/>
                        
                        <input  
                            className='form-control col-sm mx-2' 
                            type='text' name='times_a_day' 
                            placeholder='Times a day' 
                            onChange={handleInputDiet}/>
                        
                        <button className='btn btn-primary col-sm mx-2' type='submit'>Save diet</button>
                        
                        </div></form>
                        <hr className="mt-5"></hr>
                    </div>
                    <div className="medicine">
                    <h2 className="py-3">Treatments</h2>

                        <form onSubmit={sendMedicineData}>
                        <div className="row">
                        <input 
                            className='form-control col-sm mx-2' 
                            type='text' name='name' 
                            placeholder='Medicine name' 
                            onChange={handleInputMedicine}/>
                        
                        <input 
                            className='form-control col-sm mx-2' 
                            type='text' name='quantity' 
                            placeholder='Quantity (ml)' 
                            onChange={handleInputMedicine}/>
                        
                        <input 
                            className='form-control col-sm mx-2' 
                            type='text' name='times_a_day' 
                            placeholder='Times a day' 
                            onChange={handleInputMedicine}/>

                    <button className='btn btn-primary col-sm mx-2' type='submit'>Save medicine</button>

                        </div>
                        </form>

                    </div>
                    <hr className="mt-5"></hr>
                    <div className="veterinary-appointments">
                    <h2 className="py-3">Veterinary Appointments</h2>

                    <form onSubmit={sendAppointmentData}>
                        <div className="row">
                        <input 
                            className='form-control col-sm mx-2' 
                            type='text' name='date' 
                            placeholder='Date' 
                            onChange={handleInputAppointment}/>
                            
                            <input 
                            className='form-control col-sm mx-2' 
                            type='text' name='veterinarian' 
                            placeholder='Veterinarian' 
                            onChange={handleInputAppointment}/>

                    <button className='btn btn-primary col-sm mx-2' type='submit'>Save appointment</button>
                        
                        </div>
                    </form>

                    </div>
                </div>
            </div>
		</div>
	);
};


/*
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
*/