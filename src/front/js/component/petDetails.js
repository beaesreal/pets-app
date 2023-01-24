import React from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";
import { FaPen, FaArrowUp } from 'react-icons/fa'
import "../../styles/petimage.css";

const PetDetails = (props) => {
    console.log(props.breed)
	// 1) replace the hard-coded image, description, link, etc. With their property variable.
	return (
        <div className="container">
            
            <div className="card text-center shadow">
            
                <div key={props.id} className="card mobile-space">
                    <div className="overflow">
                        <img className="card-img-top" src={props.img} alt="Card image cap"></img>
                    </div>
                    <div className="card-body text-dark">
                        <div className="d-flex flex-row-reverse">
                            <p className="card-text">Id: <b>{props.id}</b></p>
                        </div>
                        
                        <h4 className="card-title"><strong>{props.title}</strong></h4>
                        <p className="card-title-2"><b> {props.gender}</b></p>
                       
                        <div class="row">
                            <div className="col-6">
                                <p className="card-text">Breed:<b className="card-prop"> {props.breed}</b></p>
                                <p className="card-text">Species:<b className="card-prop"> {props.species}</b></p>
            
                            </div>
                       
                            <div className="col-6">
                                <p className="card-text">Age:<b className="card-prop"> {props.age}</b></p>
                                <p className="card-text">Colour:<b className="card-prop"> {props.colour}</b></p> 
                            </div>
                        </div>
                     
                        <div>
                            <p className="card-caracteristics">{props.caracteristics}Es un animal tranquilo y bueno</p>  
                        </div>
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
    breed: PropType.string,
	img: PropType.string,
    age: PropType,
    birth: PropType.string,
    caracteristics: PropType.string,
	colour: PropType.string,
    gender: PropType.string,
	buttonUrl: PropType.string,
	buttonLabel: PropType.string,
};


export default PetDetails;