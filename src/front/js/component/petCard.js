import React from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";


const PetCard = (props) => {
    
	// 1) replace the hard-coded image, description, link, etc. With their property variable.
	return (
        <div className="petList container m-0 p-0">
            <div key={props.id} className="petCard card text-center mobile-space">
            <img className="card-img-top" src={props.img} alt="Card image cap"></img>
            <div className="card-body py-4">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text m-0 py-2">Date of birth: {props.birth}</p>
                <p className="card-text">Colour: {props.colour}</p>
            </div>
            <div className="card-footer p-2">
                <a href={props.buttonUrl} className="btn btn-primary p-2">{props.buttonLabel}</a>
                </div>
            </div>
    </div>



	);
};
PetCard.propTypes = {
    //add pproperties
	title: PropType.string,
	img: PropType.string,
    birth: PropType.string,
	colour: PropType.string,
	buttonUrl: PropType.string,
	buttonLabel: PropType.string,
};


export default PetCard;