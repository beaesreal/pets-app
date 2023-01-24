import React, {useState, useContext} from "react";
import Modal from "react-modal";
import { Context } from "../store/appContext";
import { FaTrash } from 'react-icons/fa'

export const AlertDeleteUser = () => {
    const { actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {setShowModal(true);}
    const handleCloseModal = () => {setShowModal(false);}

    return (
        <div>
            <button className="btn btn-danger px-3" onClick={handleOpenModal}><FaTrash className="mx-2 my-2" />Click here to delete your account</button>
            <Modal isOpen={showModal} style={{content: {maxWidth: "25rem", maxHeight: "12.5rem", margin: "auto"}}}>
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