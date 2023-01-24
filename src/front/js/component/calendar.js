import React, { useState, useEffect, useContext, useRef } from "react";
//import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "react-datetime/css/react-datetime.css"
//import Moment from 'react-moment';

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

    const [ events, setEvents ] = useState ([]);

    //const myDate = moment(str,'YYYY-MM-DD').toDate();

    
    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        //console.log(typeof moment(event.start).toDate().toString())
        calendarApi.addEvent({


            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
            
        });

        
        //element.find('.fc-event-title').append(" " + event.title);

        console.log(calendarApi)
        console.log(events)
        //{end: 'Mon, 23 Apr 2012 18:25:43 GMT', id: 1, start: 'Mon, 23 Apr 2012 18:25:43 GMT', title: 'aaaaaa', user_id: null}

    };

    const titleStorage = localStorage.getItem("title")
    const startStorage = localStorage.getItem("start")
    const endStorage = localStorage.getItem("end")

    useEffect (() => {

        const fetchData = async () => {
            
            const result = await fetch (process.env.BACKEND_URL + "/events",
            {
                method: "GET",
                mode: 'cors',
                credentials: 'omit',
                headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
                body: null
                })
            const jsonResult = await result.json()
            console.log(jsonResult)

            let calendarApi = calendarRef.current.getApi();
            jsonResult.map((item)=> {
                calendarApi.addEvent({
                    start: moment(item.start).toDate(),
                    end: moment(item.end).toDate(),
                    title: item.title,
                });
            })
        }

        fetchData();

    }, [])




    return (
        <div className="container p-5">
            <button className="btn btn-primary my-4" onClick={() => setModalOpen(true)}>Add new event</button>
            
            <div className="calendar-container">
                <FullCalendar
                        events={events}
                        ref={calendarRef}
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        //title={titleStorage}
                        //add event to data base             
                        //eventAdd={(event) => actions.handleEventAdd(event)}
                        //eventAdd={(event) => handleEventAdd(event)} 
                        datesSet={() => actions.handleDataSet()}
                    
                />
            </div>
            <div className="fc-event-title">
                <h5>{titleStorage}</h5>
                <h5>{startStorage}</h5>
                <h5>{endStorage}</h5>
            </div>

            <div className="nav-footer-info">
                        {events.map (events =>
                        <div key={events.id}>
                            <p className="nav-footer-user-name">
                                {events.title}
                            </p>
                            <p className="nav-footer-user-pets">
                                {events.start}
                            </p>
                        </div>)}
            </div>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </div>
    )
};


/*

CODE NOT USEFUL

setEvents({
            start: startStorage,
            end: endStorage,
            title: titleStorage
            
        })

    useEffect (() => {

        let calendarApi = calendarRef.current.getApi();
        //console.log(typeof moment(event.start).toDate().toString())
        calendarApi.addEvent({


            "start": events[0]["start"],
            "end": events[0]["end"],
            "title": events[0]["title"],
            
        });
        

    }, [])



    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events'));
        if (events) {
         setEvents(events);
        }
      }, []);


    useEffect ((data) => {
        const handleDataSet = async (title, start, end) => {
            
            try{
                const resp = await fetch(process.env.BACKEND_URL + "/events?start="+start+"&end="+end+"&title="+title)            
                const data = await resp.json()
				setStore({ message: data.message })
                }catch(error){
					console.log("Error loading message from backend", error)
                }
            
            //const jsonResult = await result.json()

            
        }

        setEvents(resp.data);

    }, []);
    

     


    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events'));
        if (events) {
         setEvents(events);
        }
      }, []);


    
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