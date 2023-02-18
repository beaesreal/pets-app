import React from "react";
import PropType from "prop-types";


const PetSelector = (props) => {
    
    return (
        <option className="m-0 p-0" key={props.id} value={props.id}>
            {props.name}
        </option>
	);
};
PetSelector.propTypes = {
    id: PropType.number,
	name: PropType.string,
};

export default PetSelector;