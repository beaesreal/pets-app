import React, {useState, useContext} from "react";
import Modal from "react-modal";
import { Context } from "../store/appContext";

export const ModalResetPassword = () => {
    const { actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false)
    const [ resetPassEmail, setResetPassEmail ] = useState('')

    const handleOpenModal = () => {
        setShowModal(true);
        document.getElementById("togglePassword").style.display = "none";
    }
    const handleCloseModal = () => {
        setShowModal(false);
        document.getElementById("togglePassword").style.display = "block";
    }

    const handleInputChange = (event) => {
        setResetPassEmail(event.target.value)
    }

    return (
        <div>
            <span 
                id="noPassword" 
                style={{display: "none", color: "red"}}>
                    {"Forgot your password? "}
                     <a onClick={handleOpenModal} 
                        style={{color: "darkblue", textDecoration: "underline", cursor: "pointer"}}>
                            Click here</a>
                            </span>
            <Modal isOpen={showModal} style={{content: {maxWidth: "40rem", maxHeight: "17.75rem", margin: "auto"}}}>
                <h5>E-mail needed</h5><hr></hr>
                <p>We will send you a link to the email you provide us when created your account so you can reset your password. Please, re-enter your e-mail adress here:</p>
                <form className="form-group">
                    <input 
                        id="reset-email" 
                        type="email"
                        name='email' 
                        className="form-control" 
                        onChange={handleInputChange}
                        placeholder="E-mail Adress"/>

                    <small id="reset-email-not" style={{display: "none", color: "red"}}>Please write an email</small>

                    <div className="clearfix m-4">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleCloseModal}>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary float-end"
                            onClick={(e) => {
                                e.preventDefault();
                                actions.handleResetPassword(resetPassEmail)
                            }}>
                        Send Link
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )

}