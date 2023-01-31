import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";

const EventCard = () => {

const [events, setEvents] = useState ([])


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

        setEvents (jsonResult)
    }

    fetchData();

    }, [])

    
	return (
        
        <div className="container d-flex justify-content-center pb-5">
                    
        <div className="row m-3 justify-content-center">
        {events.map (events =>
        <div className="col-lg-4 mx-4 my-2 p-3 border rounded events-map-container">
        <div key={events.id}>
            <div className="d-flex text-left">
                <h5 className="py-3">
                    {events.title}
                </h5>
            </div>
            <p className="small d-flex text-left"><b>▶️ Starts:</b></p>
            <p className="text-events-card">
                {events.start}
            </p>
            <p className="small d-flex text-left"><b>⏺️ Ends:</b></p>
            <p className="text-events-card">
                {events.end}
            </p>
        </div>
        </div>)}
        </div>
    </div>
	);
};


export default EventCard;