import React from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";


const PetCard = (props) => {
    
	// 1) replace the hard-coded image, description, link, etc. With their property variable.
	return (
        
        <div className="container" >
            <div className="card-transform">
                <div key={props.id} className="card-img-top">
                {props.img ?
                    <img className="card-img" src={props.img}></img>:
                    <img className="card-img" src="https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg"></img>
                }
                <div className="card-body py-6">
                    <h5 className="card-title">{props.title}</h5>
                    
                    <p className="card-text m-0 py-2">Specie: {props.species}</p>
                    <p className="card-text">Colour: {props.colour}</p>
                </div>
                <div className="card-footer p-2" style={{backgroundColor:'#495579'}}>
                    <a href={props.buttonUrl} className="btn btn-primary p-2">{props.buttonLabel}</a>
                    </div>
                </div>
            </div>
    </div>



	);
};
PetCard.propTypes = {
    //add pproperties
    species: PropType.string,
	title: PropType.string,
    breed: PropType.string,
	img: PropType.string,
    age: PropType.string,
    birth: PropType.string,
	colour: PropType.string,
	buttonUrl: PropType.string,
	buttonLabel: PropType.string,
};


export default PetCard;