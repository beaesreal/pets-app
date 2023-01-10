import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { LogoutButton } from "./logoutButton.js";
import { LoginButtons } from "./loginButtons.js";
import VectorLogo_Pets_APP from "../../img/VectorLogo_Pets_APP.png";
import "../../styles/home.css";


export const Navbar = () => {
	const { actions } = useContext(Context);
	const userToken = localStorage.getItem("jwt-token");
	console.log(actions.checkToken(userToken))

	return (
		<nav className="navbar navbar-expand-lg px-5 text-dark" id="menu-navbar">
			<a className="navbar-brand" href="#">
    		<img src={VectorLogo_Pets_APP} width="45" className="d-inline-block align-top" alt="" />
  			</a>
			<a className="menu-title navbar-brand" href="#">Pets name app</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav ms-auto">

			<li className="nav-item px-2 mx-2">
				<a className="nav-link" href="#">Features</a>
			</li>
			<li className="nav-item px-2 mx-2">
				<a className="nav-link" href="#">Pets</a>
			</li>
			<li className="nav-item px-3 mx-2">
				<a className="nav-link" href="#">About us</a>
			</li>
			</ul>
			
			{actions.checkToken(userToken) ? <LogoutButton /> : <LoginButtons />}
			
		</div>
		</nav>
	);
};
