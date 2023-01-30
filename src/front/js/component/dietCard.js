import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import PropType from "prop-types";

const DietCard = () => {

const [diets, setDiets] = useState ([])


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
        
        <div className="container d-flex justify-content-center pb-5">
                    
        <div className="row m-3 justify-content-center">
        {diets.map (diet =>
        <div className="col-lg-4 mx-4 my-2 p-3 border rounded event-map-container">
        <div key={diet.id}>
            <div className="">
                <h5 className="py-3">
                    {diet.mascot_name}
                </h5>
            </div>
            <p className="small"><b>▶️ Starts:</b></p>
            <p className="">
                {diet.foodname}
            </p>
            <p className="small"><b>⏺️ Ends:</b></p>
            <p className="">
                {diet.quantity}
            </p>
        </div>
        </div>)}
        </div>
    </div>
	);
};


export default DietCard;