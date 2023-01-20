import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "react-datetime/css/react-datetime.css"
import Moment from 'react-moment';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'


// CSS Styles for Calendar
import "../../styles/calendar.css";
import AddEventModal from "./addEventModal";
import moment from "moment";


export const Calendar = () => {

    const [ modalOpen, setModalOpen ] = useState (false);

    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        console.log(event)
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
        });
    };

    /*const handleDateClick = (info) => {
       setCurrentDate(info.dateStr)
    }*/


    return (
        <div className="container p-5">
            <button className="btn btn-primary my-4" onClick={() => setModalOpen(true)}>Add new event</button>
            
            <div className="calendar-container">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    // eventAdd={event => handleEventAdd(event)} --> añadir evento a base de datos
                />
            </div>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </div>
    )
};