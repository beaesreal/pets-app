import React, {useState, useContext, useEffect} from "react";
import Modal from "react-modal";
import { Context } from "../store/appContext";

export const ModalResetPassword = () => {
    const { store, actions } = useContext(Context);
    const [ showModal, setShowModal ] = useState(false)
    const [ showModalOK, setShowModalOK ] = useState(false)
    const [ resetPassEmail, setResetPassEmail ] = useState('')

    useEffect (() => {
        if (store.emailModal === true){
            setShowModalOK(true);
        }
    }, [store.emailModal])

    const handleOpenModal = () => {
        setShowModal(true);
        document.getElementById("togglePassword").style.display = "none";
    }
    const handleCloseModal = () => {
        setShowModal(false);
        document.getElementById("togglePassword").style.display = "block";
    }

    const handleOpenModalOK = () => {
          
    }
    const handleCloseModalOK = () => {
        setShowModalOK(false);
        handleCloseModal();
        location.replace('/login');
    }

    const handleInputChange = (event) => {
        setResetPassEmail(event.target.value)
    }

    return (
        <div>
            <span 
                id="noPassword" 
                style={{display: "none", color: "red"}}>
                    {'Forgot your password? '} 
                    <a 
                        style={{textDecoration: "underline", 
                                color: "darkblue", 
                                cursor: "pointer"}}
                        onClick={handleOpenModal}>
                            {'Click here'}
                    </a>
            </span>
            <Modal isOpen={showModal} style={{content: {maxWidth: "40rem", maxHeight: "19rem", margin: "auto"}}}>
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

                    <small id="reset-email-not" style={{display: "none", color: "red"}}>Please write a valid email</small>

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
                                actions.handleLink_New_Password(resetPassEmail)
                            }}>
                        Send Link
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showModalOK} style={{content: {maxWidth: "40rem", maxHeight: "15rem", margin: "auto"}}}>
                <h5>E-mail sent</h5><hr></hr>
                <p>We have send you an email with the link to reset your password. Please check your email inbox.</p>
                    <div className="d-flex justify-contend-end">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleCloseModalOK}>
                            Close
                        </button>
                    </div>
            </Modal>
        </div>
    )

}