import React, { Component } from "react";
import APP_Logo_Footer from "../../img/APP_Logo_Footer.png";
import "../../styles/index.css";
import Ellipse from "../../img/Ellipse.png";

export const Footer = () => (
	<div className="footer-bg container-fluid p-5">
	<footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pb-5 mb-4 footer-bg border-bottom">

		<div className="col mb-3">
			<a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
			<img src={APP_Logo_Footer} width="56" height="40"></img>
			<h4 className="d-flex mt-1 mb-md-0 px-3 yellow-text">Pets app</h4>
			</a>
		</div>
		<div className="col mb-3">

		</div>
		<div className="col mb-3 text-light">
			<h5>Quick menu</h5>
			<ul className="nav flex-column">
				<li className="nav-item-mb-2">Home</li>
			</ul>
			<ul className="nav flex-column">
				<li className="nav-item-mb-2">Features</li>
			</ul>
			<ul className="nav flex-column">
				<li className="nav-item-mb-2">My account</li>
			</ul>
		</div>
		<div className="col mb-3 text-light">
			<h5>Community</h5>
			<ul className="nav flex-column">
				<li className="nav-item-mb-2">About us</li>
			</ul>
			<ul className="nav flex-column">
				<li className="nav-item-mb-2">The project</li>
			</ul>
			<ul className="nav flex-column">
				<li className="nav-item-mb-2">Faq's</li>
			</ul>
		</div>
		<div className="col mb-3 text-light">
			<h5>Follow us</h5>
			<ul className="nav flex-column">
				<li>
				<img src={Ellipse} width="50"></img>
				<img className="mx-2" src={Ellipse} width="50"></img>
				<img src={Ellipse} width="50"></img>
				</li>
			</ul>
		</div> 

		<div className="col-12 d-flex flex-column flex-sm-row justify-content-between py-4 my-4 ">
			<p>
			© 2022 Company, Inc. All rights reserved.
			</p>
			
		</div>

	</footer>
	</div>
);
