import React from "react";
import PropType from "prop-types";


const CenterSelector = (props) => {
    console.log("props ", props)
    return (
        <option className="m-0 p-0" key={props.id} value={props.id}>
            {props.name}
        </option>
	);
};
CenterSelector.propTypes = {
    id: PropType.number,
	name: PropType.string,
};

export default CenterSelector;