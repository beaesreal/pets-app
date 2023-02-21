import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";
import Pet from "./icons/pet";
import { FaClinicMedical, FaCircle, FaWeight, FaSpinner, FaPaw, FaClock, FaHandHolding, Fa } from "react-icons/fa";

const AppointmentCard = () => {

    const [appointments, setAppointments] = useState ([])
const [pets, setPets] = useState ([])

useEffect (() => {
    const fetchData = async () => {
        const result = await fetch (process.env.BACKEND_URL + "/api/pet",
        {
            method: "GET",
            mode: 'cors',
            credentials: 'omit',
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
            body: null
          })
        const jsonResult = await result.json()

        setPets (jsonResult)
    }

    fetchData();

    }, [])

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/api/appointment",
            {
                method: "GET",
                mode: 'cors',
                credentials: 'omit',
                headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
                body: null
              })
            const jsonResult = await result.json()
    
            setAppointments (jsonResult)
        }
    
        fetchData();
    
        }, [])

    
	return (
        <div className="container d-flex justify-content-left ">     
        <div className="row justify-content-left" >
            
        {appointments.map (appointment =>
        <div className="col-sm mx-2 my-2 p-3 border rounded text-left info-container-profile" >
            
        <div >
            
            <div key={appointment.id} >

                
                <p className="text-left" >
                    <FaPaw/> <b>Mascot ID:</b> {appointment.mascot_id}
                </p>
                <p>
                    <FaClinicMedical/> <b>Center ID:</b> {appointment.center_id}
                </p>
                <p>
                    <FaClock/> <b>Date:</b> {appointment.date}
                </p>
            </div>
        </div>
        </div>)}
        </div>
    </div>
	);
};


export default AppointmentCard;