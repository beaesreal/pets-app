import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Sidebar = () => {
	const { store, actions } = useContext(Context);
    const [ isExpanded, setExpandState ] = useState (false);
    const menuItems = [
       {
            text: "Username",
            icon: "icons/user.svg",
        },
        {
            text: "Email",
            icon: "icons/sms.svg",
        },
        {
            text: "Pets",
            icon: "icons/pet.svg",
        },
        {
            text: "Events",
            icon: "icons/calendar.svg",
        },
        {
            text: "Settings",
            icon: "icons/settings.svg",
        },
        {
            text: "Log out",
            icon: "icons/logout.svg",
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
                        <img src={icon} alt=""  srcSet="" />
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
