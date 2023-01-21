import React, {useState} from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';


export default function ({ isOpen, onClose, onEventAdded }) {

    const [ title, setTitle ] = useState("");
    const [ start, setStart ] = useState(new Date());
    const [ end, setEnd ] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            title,
            start,
            end
        })

        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit} action="/events" method="POST">

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

                <button className="btn btn-primary my-4">
                    Add event
                </button>

            </form>
        </Modal>
    )
}