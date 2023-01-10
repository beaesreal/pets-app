import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaDog, FaCat, FaHeart } from 'react-icons/fa'

import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
            <div className="col-lg-4 col-md-3 col-sm-1 bg-dark text-light p-5 m-3">
                <div>
                    <h2>
                        My profile
                    </h2>
                    <p className="pt-4">
                        <FaUser/> Username
                    </p>
                    <p>
                        <FaEnvelope/> Email address
                    </p>
                    <p>
                        <FaHeart/> Number of pets
                    </p>
                </div>
                <div>
                    <Link to="/">
                        <button className="btn btn-light mt-5">Settings</button>
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <button className="btn btn-danger my-2">Delete account</button>
                    </Link>
                </div>
            </div>
			<ul className="list-group">
				{store.demo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
							// Check to see if the background is orange, if so, display the message
							item.background === "orange" ? (
								<p style={{ color: item.initial }}>
									Check store/flux.js scroll to the actions to see the code
								</p>
							) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
