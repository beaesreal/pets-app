import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";
import Pet from "./icons/pet";

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
        <div className="container d-flex justify-content-left pb-5">
           <div>
            
            </div>         
        <div className="row justify-content-left">
            
        {diets.map (diet =>
        <div className="col-sm mx-2 my-2 p-3 border rounded">
        <div >
            
            <div key={diet.id} >
                {pets.map(pet => 
                <div key={pet.id}>
                    <h3>
                        {pet.name}
                    </h3>

                </div>)}
                <p className="py-3">
                    {diet.foodname}
                </p>
                <p>
                    {diet.quantity}
                </p>
                <p>
                    {diet.times_a_day}
                </p>
            </div>
        </div>
        </div>)}
        </div>
    </div>
	);
};


export default DietCard;