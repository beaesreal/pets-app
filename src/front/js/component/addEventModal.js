import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import Modal from "react-modal";
import Datetime from 'react-datetime';

export default function ({ isOpen, onClose, onEventAdded }) {
    const { actions } = useContext(Context);

    const [ title, setTitle ] = useState("");
    const [ start, setStart ] = useState("");
    const [ end, setEnd ] = useState("");
    const [ events, setEvents ] = useState ([]);

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            title,
            start,
            end
        })

        onClose();
    }

    function bringToFront(element) {
        element.style.zIndex = "100";
    }

    
    function eventsOnClick(){
        actions.handleEventAdd(title, start, end);
        //actions.handleDataSet(title, start, end);
        bringToFront(Modal);
    }


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={{content: {maxWidth: "40rem", maxHeight: "35rem", margin: "auto"}}}>
            <form onSubmit={onSubmit}>

                <div>
                    <label className="p-2"><h5>Appointment</h5></label>
                </div>
                
                <input className="p-2" placeholder ="Title" value={title} onChange={e => setTitle(e.target.value)} />
            
                <div>
                    <label className="p-2 mt-2">Start Date</label>
                    <Datetime value={start} onChange={date => setStart(date)} />
                </div>
                
                <div>
                    <label className="p-2 mt-2">End Date</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                </div>

                <button type="submit" className="btn btn-primary my-4" 
                    onClick={() => 
                    eventsOnClick()
                    }>
                    Add event
                </button>

            </form>
        </Modal>
    )
}



/*

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem({"title": title}));
        if (events) {
         setEvents(events);
        }
      }, []);


    const handleTitleChange= (event) => {
        // console.log(event.target.value)
        setTitle({
            ...title, 
            [event.target.name] : event.target.value
        })
    }

    const handleStartChange= (event) => {
        // console.log(event.target.value)
        setStart({
            ...start, 
            [event.target.name] : event.target.value
        })
    }

    const handleEndChange= (event) => {
        // console.log(event.target.value)
        setEnd({
            ...end, 
            [event.target.name] : event.target.value
        })
    }

    const handleEventAdd = async (event) => {
        event.preventDefault()
        
        console.log(handleEventAdd)

        let jsonBody;

        jsonBody = {
            'title': title.title, 
            'start': start.start, 
            'end': end.end, 
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


    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events'));
        if (events) {
         setEvents(events);
        }
      }, []);
    */