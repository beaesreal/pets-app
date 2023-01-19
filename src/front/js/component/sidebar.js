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
            text: <a className="link-menu" href="/profile">Profile</a>,
            icon: <a className="link-menu" href="/profile"><User height="50" width="50" /></a>,
        },
        /*{
            text: <a className="link-menu" href="/notifications">Notifications</a>,
            <a className="link-menu" href="/notifications"><Email height="50" width="50" /></a>,
        },*/
        {
            text: <a className="link-menu" href="/pets">Pets</a>,
            icon: <a className="link-menu" href="/pets"><Pet height="50" width="50" /></a>,
        },
        {
            text: <a className="link-menu" href="/events">Events</a>,
            icon: <a className="link-menu" href="/events"><Calendar height="50" width="50" /></a>,
        },
        {
            text: <a className="link-menu" href="/settings">Settings</a>,
            icon: <a className="link-menu" href="/settings"><Settings height="50" width="50" /></a>,
        },
    ];


    // GET User info to show on sidebar

    const [users, setUsers] = useState ([])

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch (process.env.BACKEND_URL + "/user")
            const jsonResult = await result.json()

            setUsers(jsonResult)
        }

        fetchData();

    }, [])


    const mailStorage = localStorage.getItem("email")

    return (
		<div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
			<div className="nav-upper">
                <div className="nav-heading text-center">
                    {isExpanded && (<div className="nav-brand">
                        <h5 className="p-4">
                            My account
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
                    <div className="nav-footer-info">
                        <p className="nav-footer-user-pets">
                            {mailStorage}
                        </p>
                        {users.map (user =>
                        <div key={user.id}>
                            <p className="nav-footer-user-name">
                                {user.username}
                            </p>
                            <p className="nav-footer-user-pets">
                                {user.email}
                            </p>
                        </div>)}
                    </div>
                </div>)}
                    <button className="logout-icon btn-primary" onClick={actions.handleLogout}>
                        <Logout height="50" width="50" />
                    </button>
            </div>
		</div>
	);
};
