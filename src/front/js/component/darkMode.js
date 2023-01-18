import React, {useState} from "react";

// CSS Styles for Dark Mode
import "../../styles/darkMode.css";

// import button as a component
import DarkModeButton from "./darkModeButton";

import { FaMoon } from "react-icons/fa";

const DarkMode = () => {

    // dark mode button
    const [ btnState, setBtnState ] = useState (false);
    function handleClick () {
        setBtnState (btnState => !btnState);
    }
    let toggleClassCheck = btnState ? ' dm-active' : '';

    // light and dark theme variables
    let clickedClass = "clicked";
    const body = document.body;
    const lightTheme = "light";
    const darkTheme = "dark";
    let theme;

    // local Storage to see the theme and switch between
    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    if (theme === lightTheme || theme === darkTheme) {
        // add the CSS class to the document body
        body.classList.add(theme);
    } else {
        body.classList.add(lightTheme);
    }

    const switchTheme = (e) => {
        if (theme === darkTheme) {
            body.classList.replace(darkTheme, lightTheme);
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "light");
            theme = lightTheme;
        } else {
            body.classList.replace(lightTheme, darkTheme);
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "dark");
            theme = darkTheme;
        }
    };
    
    return(
        <button 
            className={theme === "dark" ? clickedClass : ""}
            //{`btn${toggleClassCheck}`}
            //className={`btn${toggleClassCheck}`}
            id="darkMode"
            onClick={(e) => {switchTheme(e); handleClick}}>
            <FaMoon className="moon-icon" />
        </button>
    );
};

export default DarkMode;

