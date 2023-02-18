import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { Navigate, useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css'
import "../../styles/home.css";

import { Context } from "../store/appContext";
import { Sidebar } from "../component/sidebar";
import DarkMode from "../component/darkMode";

import PetSelector from "../component/petSelector";
import CenterSelector from "../component/centerSelector";
import { options } from "@fullcalendar/core/preact";


export const PetCare = () => {
	const { store, actions } = useContext(Context);
    const [ date, setDate] = useState(new Date());
    const navigate = useNavigate();

    const onChange = date => {
        setDate(date);
    };


    //Checks if logged-in
    useEffect (() => {
        const userToken = localStorage.getItem('jwt-token');

        if (!userToken) {navigate("/login")}

    }, [navigate])


    // Dark mode
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
        mascot_id: '',
        foodname:'',
        quantity:'',
        times_a_day:'',
    })

    const handleInputDiet= (event) => {
        // console.log(event.target.value)
        console.log(pets)
        setDietInfo({
            ...dietInfo, 
            [event.target.name] : event.target.value
        })
    }

    const sendDietData = async (event) => {
        event.preventDefault()
        
        console.log(dietInfo.mascot_id + " " + dietInfo.foodname + " " + dietInfo.quantity + " " + dietInfo.times_a_day)

        let jsonBody;

        jsonBody = {
            'mascot_id': dietInfo.mascot_id,
            'foodname': dietInfo.foodname,
            'quantity': dietInfo.quantity, 
            'times_a_day': dietInfo.times_a_day,        
            }

        const resp = await fetch(
            process.env.BACKEND_URL + "/diet/create",
                {
                method: "POST",
                mode: 'cors',
                credentials: 'omit',
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`               
                  },
                body: JSON.stringify(jsonBody),
                }
          ).then(alert("Diet added!"))
        

    }


    // TREATMENT

    const [medicineInfo, setMedicineInfo] = useState({
        mascot_id: '',
        name:'',
        quantity:'',
        times_a_day:'',
    })

    const handleInputMedicine= (event) => {
        // console.log(event.target.value)
        setMedicineInfo({
            ...medicineInfo, 
            [event.target.name] : event.target.value
        })
    }

    const sendMedicineData = async (event) => {
        event.preventDefault()
        
        let jsonBody;

        jsonBody = {
            'mascot_id': medicineInfo.mascot_id,
            'name': medicineInfo.name,
            'quantity': medicineInfo.quantity, 
            'times_a_day': medicineInfo.times_a_day,        
            }

        const resp = await fetch(
            process.env.BACKEND_URL + "/medicine/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`               
                },
              body: JSON.stringify(jsonBody),
            }
          ).then(alert("Treatment added!"))

    }


    // VET APPOINTMENT

    const [appointmentInfo, setAppointmentInfo] = useState({
        mascot_id: '',
        center_id: '',
        date:'',
    })
    
    const handleInputAppointment= (event) => {
        // console.log(event.target.value)
        setAppointmentInfo({
            ...appointmentInfo, 
            [event.target.name] : event.target.value
        })
    }

    const sendAppointmentData = async (event) => {
        event.preventDefault()
        
        let jsonBody;

        jsonBody = {
            'mascot_id': appointmentInfo.mascot_id,
            'center_id': appointmentInfo.center_id,
            'date': appointmentInfo.date,
            }

        const resp = await fetch(
            process.env.BACKEND_URL + "/appointment/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`               
                },
              body: JSON.stringify(jsonBody),
            }
          ).then(alert("Appointment added!"))

    }

    // Show pet Names

    const [pets, setPets] = useState ([])

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/pet",
            
            {
                method: "GET",
                mode: 'cors',
                credentials: 'omit',
                headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
                body: null,
                })
            const jsonResult = await result.json()

            setPets(jsonResult)
        }

        fetchData();

    }, [])


    // Show Vet Clinics' Names

    const [veterinarians, setVeterinarians] = useState ([])

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/veterinarian",
            
            {
                method: "GET",
                mode: 'cors',
                credentials: 'omit',
                headers: {"Content-Type": "application/json"},
                body: null,
                })
            const jsonResult = await result.json()

            setVeterinarians(jsonResult)
        }

        fetchData();

    }, [])
 

    

	return (

		<div className="container-fluid p-0">
            <div className="row">
                <div className="col-1">
                    <Sidebar />
                </div>

                <div className="col-11 text-center justify-content-center py-3 px-5">
                    <div className="diet py-4 ">
                    <h1 className="pb-5 mx-5">Pet Care</h1>
                    <h2 className="py-4">Diet</h2>
                    <form onSubmit={sendDietData}>
                        <div className="row px-4">
                        <select class="selectpicker col-sm mx-2"
                            onChange={handleInputDiet} name='mascot_id'>
                            {pets.map (pet =>
                            
                                <PetSelector
                                id={pet.id}
                                name={pet.name}
                                
                                 />
                            )}
                        </select>
                        
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


                    <div className="medicine py-4">
                    <h2 className="py-4">Treatments</h2>

                        <form onSubmit={sendMedicineData}>
                        <div className="row px-4">
                        <select class="selectpicker col-sm mx-2"
                            onChange={handleInputMedicine} name='mascot_id'>
                            {pets.map (pet =>
                            
                                <PetSelector
                                id={pet.id}
                                name={pet.name}
                                
                                 />
                            )}
                        </select>

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

                    <button className='btn btn-primary col-sm mx-2' type='submit'>Save treatment</button>

                        </div>
                        </form>

                    </div>
                    <hr className="mt-5"></hr>


                    <div className="veterinary-appointments py-4">
                    <h2 className="py-4">Veterinary Appointments</h2>

                    <form onSubmit={sendAppointmentData}>
                        <div className="row px-4">
                        <select class="selectpicker col-sm mx-2"
                            onChange={handleInputAppointment} name='mascot_id'>
                            {pets.map (pet =>
                            
                                <PetSelector
                                id={pet.id}
                                name={pet.name}
                                
                                 />
                            )}
                        </select>

                        <select class="selectpicker col-sm mx-2"
                            onChange={handleInputAppointment} name='center_id'>
                            {veterinarians.map (clinic =>
                            
                                <CenterSelector
                                id={clinic.id}
                                name={clinic.clinic_name}
                                
                                 />
                            )}
                        </select>

                        <input 
                            className='form-control col-sm mx-2' 
                            type='date' name='date' 
                            placeholder='Date' 
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