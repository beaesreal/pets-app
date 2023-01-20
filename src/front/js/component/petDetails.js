import React from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";
import { FaPen, FaArrowUp } from 'react-icons/fa'
import "../../styles/petimage.css";

const PetDetails = (props) => {
    
	// 1) replace the hard-coded image, description, link, etc. With their property variable.
	return (
        <div className="container">
            
            <div className="card text-center shadow">
            
                <div key={props.id} className="card mobile-space">
                    <div className="overflow">
                        <img className="card-img-top" src={props.img} alt="Card image cap"></img>
                    </div>
                    <div className="card-body text-dark">
                        <h4 className="card-title"><strong>{props.title}</strong></h4>
                        <p className="card-text"><b>Id:</b> {props.id}</p>
                        <p className="card-text"><b>Age:</b> {props.age}</p>
                        <p className="card-text"><b>Date of Birth: </b>{props.birth}</p>
                        <p className="card-text"><b>Colour:</b> {props.colour}</p>     
                    </div>
                <div className="card-button py-1">
                    <a href={props.buttonUrl} className="button btn btn-outline p-2">{props.buttonLabel}</a>
                    </div>
                </div>
            </div>    
        
    </div>



	);
};
PetDetails.propTypes = {
    //add pproperties
    id: PropType.string,
	title: PropType.string,
	img: PropType.string,
    age: PropType.string,
    birth: PropType.string,
	colour: PropType.string,
    gender: PropType.string,
	buttonUrl: PropType.string,
	buttonLabel: PropType.string,
};


export default PetDetails;