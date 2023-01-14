import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// CSS Styles for Sidebar
import "../../styles/sidebar.css";

// SVG Icons
import Calendar from "./icons/calendar";
import Email from "./icons/email";
import Logout from "./icons/logout";
import Pet from "./icons/pet";
import Settings from "./icons/settings";
import User from "./icons/user";



export const Sidebar = () => {
	const { store, actions } = useContext(Context);
    const [ isExpanded, setExpandState ] = useState (false);
    const menuItems = [
       {
            text: "Username",
            icon: <User height="50" width="50" />,
        },
        {
            text: "Email",
            icon: <Email height="50" width="50" />,
        },
        {
            text: "Pets",
            icon: <Pet height="50" width="50" />,
        },
        {
            text: "Events",
            icon: <Calendar height="50" width="50" />,
        },
        {
            text: "Settings",
            icon: <Settings height="50" width="50" />,
        },
        {
            text: "Log out",
            icon: <Logout height="50" width="50" />,
        },
    ];

	return (
		<div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
			<div className="nav-upper">
                <div className="nav-heading">
                    {isExpanded && (<div className="nav-brand">
                        <img></img>
                        <h5>
                            My profile
                        </h5>
                    </div>)}
                    <button className={isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"}
                    onClick={() => setExpandState(!isExpanded)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="nav-menu">{menuItems.map(({text, icon}) => (
                    <a href="#" className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
                        {icon}
                        {isExpanded && <p>{text}</p>}
                        {!isExpanded && <div className="tooltip">{text}</div>}
                    </a>
                    ))}
                </div>
            </div>
            <div className="nav-footer">
                {isExpanded && (<div className="nav-details">
                    <img src="icons/pet.svg"/>
                    <div className="nav-footer-info">
                        <p className="nav-footer-user-name">
                            Username
                        </p>
                        <p className="nav-footer-user-pets">
                            Number of pets
                        </p>
                    </div>
                </div>)}
                <img className="logout-icon" src="icons/logout.svg"/>
            </div>
		</div>
	);
};
