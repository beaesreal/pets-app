import React, {useState} from "react";
// CSS Styles for Dark Mode
import "../../styles/darkMode.css";
import { FaMoon } from "react-icons/fa";

function DarkModeButton () {

    const [ btnState, setBtnState ] = useState (false);

    function handleClick () {

        setBtnState (btnState => !btnState);
    }

    let toggleClassCheck = btnState ? ' dm-active' : null;


    return (
        //{`btn${toggleClassCheck}`}
        //${theme === "dark" ? clickedClass : ""}
        <button
        className={theme === "dark" ? clickedClass : ""}
        onClick={handleClick}
        id="darkMode"
        >
        <FaMoon className="moon-icon"/></button>
    )

}

export default DarkModeButton;