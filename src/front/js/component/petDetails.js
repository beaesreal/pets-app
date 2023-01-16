import React from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";
import { FaPen, FaArrowUp } from 'react-icons/fa'


const PetDetails = (props) => {
    
	// 1) replace the hard-coded image, description, link, etc. With their property variable.
	return (
        <div className="petList container m-0 p-0">
            <div key={props.id} className="petDetaPetDetails card text-center mobile-space">
            <img className="card-img-top" src={props.img} alt="Card image cap"></img>
            <div className="card-body py-4">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text m-0 py-2">Date of birth: {props.birth}</p>
                <p className="card-text">Colour: {props.colour}</p>
                <p className="card-text">Id: {props.id}</p>
            </div>
            <div className="p-2">
                <a href={props.buttonUrl} className="btn btn-outline-primary p-2">{props.buttonLabel}</a>
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
    birth: PropType.string,
	colour: PropType.string,
    gender: PropType.string,
	buttonUrl: PropType.string,
	buttonLabel: PropType.string,
};


export default PetDetails;