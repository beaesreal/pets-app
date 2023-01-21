import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "react-datetime/css/react-datetime.css"

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import addEventModal from "./addEventModal";

// Icons
import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'

// CSS Styles for Calendar
import "../../styles/calendar.css";
import AddEventModal from "./addEventModal";


export const Calendar = () => {

    const [ modalOpen, setModalOpen ] = useState (false);

    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent(event);
    };


    return (
        <div className="container p-5">
            <button className="btn btn-primary my-4" onClick={() => setModalOpen(true)}>Add new event</button>
            
            <div className="calendar-container">
                <FullCalendar
                ref={calendarRef}
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                // eventAdd={event => handleEventAdd(event)} --> añadir evento a base de datos
                />
            </div>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
        </div>
    )
};