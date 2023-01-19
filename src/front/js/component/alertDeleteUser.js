import React, {useState, useContext} from "react";
import Modal from "react-modal";
import { Context } from "../store/appContext";

export const AlertDeleteUser = (props) => {
    const { actions } = useContext(Context);
    const {isOpen, onClose} = props;
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {setShowModal(true);}
    const handleCloseModal = () => {setShowModal(false);}

    return (
        <div>
            <button onClick={handleOpenModal}>Trigger Modal</button>
            <Modal isOpen={showModal} onRequestClose={onClose} style={{content: {maxWidth: "25rem", maxHeight: "12.5rem", margin: "auto"}}}>
                <h5>Confirmation needed</h5><hr></hr>
                <p>Are you sure you want to delete this account? This action cannot be undone.</p>
                <div className="clearfix">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                    <button type="button" className="btn btn-danger float-end" onClick={() => {actions.handleDeleteUser()}}>
                    Delete
                    </button>
                </div>
            </Modal>
        </div>
    )

}