import React, { Component } from "react";
import APP_Logo_Footer from "../../img/APP_Logo_Footer.png";
import "../../styles/index.css";
import Ellipse from "../../img/Ellipse.png";
import Github_icon from "../../img/Github_icon.png";

export const Footer = () => {

	return (
	<div className="footer-bg container-fluid p-5">
	<footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pb-5 mb-4 footer-bg">
		<div className="col mb-3">
			<a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
			<img className="mx-3" src={APP_Logo_Footer} width="56" height="40"></img>
			<h4 className="d-flex mt-1 mb-md-0 yellow-text">Pet A Pet</h4>
			</a>
		</div>
		<div className="col mb-3">

		</div>
		<div className="col mb-3 py-2 text-light">
			<h5>Quick menu</h5>
			<ul className="nav flex-column">
				<a href="/" className="footer-links"><li className="nav-item-mb-2">Home</li></a>
			</ul>
			<ul className="nav flex-column">
			<a href="/#features" className="footer-links"><li className="nav-item-mb-2">Features</li></a>
			</ul>
			<ul className="nav flex-column">
			<a href="/profile" className="footer-links"><li className="nav-item-mb-2">My account</li></a>
			</ul>
		</div>
		<div className="col mb-3 py-2 text-light">
			<h5>Community</h5>
			<ul className="nav flex-column">
			<a href="/#curiosities" className="footer-links"><li className="nav-item-mb-2">Dog facts</li></a>
			</ul>
			<ul className="nav flex-column">
			<a href="/signup" className="footer-links"><li className="nav-item-mb-2">Join today</li></a>
			</ul>
			<ul className="nav flex-column">
			<a href="/create" className="footer-links"><li className="nav-item-mb-2">Add my pet</li></a>
			</ul>
		</div>
		<div className="col mb-3 py-2 text-light">
			<h5>Follow us</h5>
			<ul className="nav flex-column">
				<li>
				<a href="https://github.com/beaesreal"><img src={Github_icon} width="40"></img></a>
				<a href="https://github.com/Gleonag"><img className="mx-2" src={Github_icon} width="40"></img></a>
				<a href="https://github.com/m4hidalgo"><img src={Github_icon} width="40"></img></a>
				</li>
			</ul>
		</div>

	</footer>

	<div className="d-flex flex-column flex-sm-row justify-content-between py-2 my-2 border-top yellow-text">
		<p className="p-2"> ?? Pet A Pet, 2023. Made by Beatriz, Gonzalo & Miguel ??ngel.</p>
		<p className="p-2 d-flex"> 4Geeks Academy - Final Project</p>
	</div>

	</div>
	)
};
