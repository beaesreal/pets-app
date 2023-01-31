import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";
import Pet from "./icons/pet";
import { FaInfo, FaCircle, FaWeight, FaSpinner, FaPaw, FaClock, FaHandHolding, Fa } from "react-icons/fa";

const DietCard = () => {

const [diets, setDiets] = useState ([])
const [pets, setPets] = useState ([])

useEffect (() => {
    const fetchData = async () => {
        const result = await fetch (process.env.BACKEND_URL + "/pet",
        {
            method: "GET",
            mode: 'cors',
            credentials: 'omit',
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
            body: null
          })
        const jsonResult = await result.json()

        setPets (jsonResult)
    }

    fetchData();

    }, [])

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/diet",
            {
                method: "GET",
                mode: 'cors',
                credentials: 'omit',
                headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
                body: null
              })
            const jsonResult = await result.json()
    
            setDiets (jsonResult)
        }
    
        fetchData();
    
        }, [])

    
	return (
        <div className="container d-flex justify-content-left ">     
        <div className="row justify-content-left" >
            
        {diets.map (diet =>
        <div className="col-sm mx-2 my-2 p-3 border rounded text-left info-container-profile" >
            
        <div >
            
            <div key={diet.id} >

                
                <p className="text-left" >
                    <FaPaw/> <b>Mascot ID:</b> {diet.mascot_id} 
                </p>
                <p>
                    <FaCircle/> <b>Food Name:</b> {diet.foodname}
                </p>
                <p>
                    <FaWeight/> <b>Quantity:</b> {diet.quantity}
                </p>
                <p>
                    <FaClock/> <b>Times a day:</b> {diet.times_a_day}
                </p>
            </div>
        </div>
        </div>)}
        </div>
    </div>
	);
};


export default DietCard;