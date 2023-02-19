import React from "react";
import {Link} from 'react-router-dom'
import ReactDOM from "react-dom";
import PropType from "prop-types";
import {  } from 'react-icons/fa'
import "../../styles/petimage.css";


const PetDetails = (props) => {

    	return (
        <div className="container pets-details-container">
            <div className="card shadow ">

                <div key={props.id} className="card mobile-space ">
                    <div className="overflow ">
                    {props.img ?
                        <img className="card-img-top" src={props.img}></img>:
                        <img className="card-img-top" src="https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg"></img>
                    }
                    </div>
                    

                    <div className="card-body text-dark" >
                        <div className="pt-2 row">
                        <div className="col-lg-10 col-sm-12">
                            <h4 className="card-title-2"><strong>{props.title}</strong></h4>
                            <p className="card-title-3"><b> {props.gender}</b></p> 
                    </div>
                            <div className="col-lg-1 col-sm-12 mt-2">
                            <p className="btn btn-primary">Id: <b>{props.id}</b></p>
                        
                        </div>

                        </div>
                        <hr className=" mb-4"></hr>

                        
                        
                                              
                        <div class="row text-left">
                            <div className="col-lg-6 col-sm-12">
                                <p className="card-text">Breed:<b className="card-prop"> {props.breed}</b></p>
                                <p className="card-text">Species:<b className="card-prop"> {props.species}</b></p>
            
                            </div>
                       
                            <div className="col-lg-6 col-sm-12">
                                <p className="card-text">Age:<b className="card-prop"> {props.age}</b></p>
                                <p className="card-text">Colour:<b className="card-prop"> {props.colour}</b></p> 
                            </div>
                        </div>
                        <hr className="mt-4 mb-0"></hr>
                        <div>
                            <p className="card-caracteristics"><b>Other characteristics:</b> {props.caracteristics}</p>  
                        </div>
                    </div>
                    <div className="card-button text-center">
                    <Link to={`edit/${props.id}`}>
                        <button className="button btn btn-primary text-light p-2 my-3">{props.buttonLabel}</button>
                    </Link>
                   
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
    image: PropType.string,
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