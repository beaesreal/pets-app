import React from "react";
import { Link } from "react-router-dom";
import VectorLogo_Pets_APP from "../../img/VectorLogo_Pets_APP.png";
import "../../styles/home.css";


export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg px-5 text-dark" id="menu-navbar">
			<a class="navbar-brand" href="#">
    		<img src={VectorLogo_Pets_APP} width="45" class="d-inline-block align-top" alt="" />
  			</a>
			<a class="menu-title navbar-brand" href="#">Pets name app</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav ms-auto">

			<li class="nav-item px-2 mx-2">
				<a class="nav-link" href="#">Features</a>
			</li>
			<li class="nav-item px-2 mx-2">
				<a class="nav-link" href="#">Pets</a>
			</li>
			<li class="nav-item px-3 mx-2">
				<a class="nav-link" href="#">About us</a>
			</li>
			</ul>
			
			<button class="btn btn-outline-primary my-2 my-sm-0 px-4 m-2" type="submit">Log in</button>
			<button class="btn btn-primary my-2 my-sm-0 px-4 mx-2" type="submit">Register</button>
		</div>
		</nav>
	);
};
