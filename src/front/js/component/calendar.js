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
    const { actions } = useContext(Context);

    const [ modalOpen, setModalOpen ] = useState (false);


    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        console.log(event)
        calendarApi.addEvent({
            //faltaba incluir moment para poder seleccionar fechas posteriores y eventos :)
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
        });
    };

 
    /*
    const [ events, setEvents ] = useState ({
        title: '',
        start: '',
        end: '',
    });

    
    const handleEventChange = (event) => {
        setEvents({
            ...events, 
            [event.target.name] : event.target.value
        })
    }

     

    const addEvent = (event) => {
        setEvents({
            ...events,
            [event.target.name] : event.target.value
        })
    }

    const handleEventAdd = (event) => {
        onEventAdded({
            ...onEventAdded, 
            [event.target.name] : event.target.value
        })
    }
    
    const handleDateClick = (info) => {
       setCurrentDate(info.dateStr)
    }

    const [events, setEvents] = useState ([])
    useEffect (() => {
        const handleEventAdd = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/event/create",)
            const jsonResult = await result.json()

            setEvents(jsonResult)
        }

        handleEventAdd();

    }, [])
}

    const handleEventAdd = async (event) => {
        event.preventDefault()
        
        console.log(handleEventAdd)

        let jsonBody;

        jsonBody = {
            'title': onEventAdded.title, 
            'start': onEventAdded.start, 
            'end': onEventAdded.end, 
            }

        const resp = await fetch(
            process.env.BACKEND_URL + "/event/create",
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(jsonBody),
            }
          )
    }

    */


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
                    //add event to data base             
                    //eventAdd={(event) => actions.handleEventAdd(event)}
                    //eventAdd={(event) => handleEventAdd(event)} 
                    //dateSet={(date) => handleDataSet(date)} 
                />
            </div>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </div>
    )
};