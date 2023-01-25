import React, { useContext, useEffect, useState, useMemo } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

// Styles
import "../../styles/home.css";
import "../../styles/darkMode.css";


// images
import Dog_header from "../../img/Dog_header.png";
import Img_1 from "../../img/Img_1.png";
import Img_2 from "../../img/Img_2.png";
import Img_3 from "../../img/Img_3.png";
import Img_4 from "../../img/Img_4.png";
import Img_5 from "../../img/Img_5.png";
import Img_6 from "../../img/Img_6.png";
import Img_7 from "../../img/Img_7.png";
import Dalmatian from "../../img/Dalmatian.jpg";



export const Home = () => {
	const { store, actions } = useContext(Context);
	const [ petPic, setPetPic ] = useState('');
	const [ dogFact, setDogFact ] = useState('');

	// Dark & light theme check
	const body = document.body;
    const theme = localStorage.getItem("theme")
    useEffect (() => {
        if (theme == "dark"){
            body.classList.add(theme);
        } else {
            body.classList.add("light");
        }
    }, [])

	useMemo (() => {
		actions.getPic().then((res) => setPetPic(res))
	}, [])

	useMemo (() => {
		actions.getFact().then((res) => setDogFact(res))
	}, [])

	return (
		<div className="container-fluid p-5 header-bg pt-5 p-sm-4">

			<div className="container-fluid header-bg">
				<div className="container p-4">
				<div className="row align-items-center p-lg-5">
					<div className="col-lg-6 col-sm-1">
						<h1 className="m-lg-5">
							The website you need for your pets.
						</h1>
						<a href="/signup"><button class="btn m-lg-5 btn-primary px-4 my-4 joinBtn" type="submit">Join Today</button></a>
					</div>
					<div className="col-lg-5 col-sm-1">
						<img className="h-100 w-100" src={Dog_header} alt="First slide"/>
					</div>
				</div>
				</div>

			</div>
			
				

				<div className="container">
					<div className="row py-5 px-3">
						<div className="col-sm py-5 m-lg-3">
						<img className="d-block w-100 pb-4" src={Img_1} />
							<h5>
								Veterinary appointments
							</h5>
							<p>
								Remembering the vet will no longer be a problem, register, add your pets and save their appointments.
							</p>
							<a><b>
								Learn more
							</b></a>
						</div>
						<div className="col-sm py-lg-5 m-lg-3">
						<img className="d-block w-100 pb-4" src={Img_2} />
							<h5>
								Save your walks
							</h5>
							<p>
								Save your daily route, your morning walks and get suggestions for nearby parks where you can walk your animals.
							</p>
							<a><b>
								Learn more
							</b></a>
						</div>
						<div class="col-sm py-lg-5 m-lg-3">
						<img className="d-block w-100 pb-4" src={Img_2} />
							<h5>
								Save your walks
							</h5>
							<p>
								Save your daily route, your morning walks and get suggestions for nearby parks where you can walk your animals.
							</p>
							<a><b>
								Learn more
							</b></a>
						</div>
						<div class="col-sm py-5 m-lg-3">
						<img className="d-block w-100 pb-4" src={Img_3} />
							<h5>
								Add all your pets
							</h5>
							<p>
								Your pets' data is safe. You can add daily feeding amounts, feeding reminders and more.
							</p>
							<a><b>
								Learn more
							</b></a>
						</div>
					</div>
					</div>

					<div className="container-fluid section-separator p-5">
						<div className="row align-items-center">
							<h2 className="text-center text-light ">
								Do you need more?
							</h2>
						</div>
					</div>

					<div className="container ">
						<div className="row text-center mt-4 pt-5">
							<h2>How to start?</h2>
							<h4>Four simple steps to follow</h4>
						</div>
						<div className="container text-center">
						<div className="row py-5 px-2">
						<div class="col-lg-3 col-md-2 col-sm-1">
							<img className="d-block w-100 pb-4 rounded" src={Img_4} />
								<a href="/signup"><h5>
									Register
								</h5></a>
								<p>
									We will only need your username and an email address.
								</p>
							</div>
						<div class="col-lg-3 col-md-2 col-sm-1">
							<img className="d-block w-100 pb-4 rounded" src={Img_5} />
								<a href="/login"><h5>
									Log in
								</h5></a>
								<p>
									Log in to your account and add further details if necessary.
								</p>
						</div>
						<div class="col-lg-3 col-md-2 col-sm-1">
							<img className="d-block w-100 pb-4 rounded" src={Img_6} />
								<a href="/create"><h5>
									Add your animals
								</h5></a>
								<p>
								You can add their profile picture, age, weight and much more.
								</p>
						</div>
						<div class="col-lg-3 col-md-2 col-sm-1">
						<img className="d-block w-100 pb-4 rounded" src={Img_7} />
							<a href="/"><h5>
								Enjoy the website
							</h5></a>
							<p>
								Enjoy discovering all the features it offers... it's free!
							</p>
						</div>
						</div>
						</div>
					</div>

					<div className="container-fluid photo-text-section py-5 px-5 petBlog">
						<div className="container-md">
							<div className="row align-items-center p-lg-5">
								<div className="col-sm p-3 d-flex justify-content-center">
									<img id="petPic" className="d-block w-100 pb-4 rounded img-fluid" src={petPic}/>
								</div>
							<div className="col-sm p-lg-3">
								<h4 className="pb-2"><b>
									Did you know that...?
								</b></h4>
								<p>
									{dogFact}
								</p>
							</div>
						</div>
					</div>
				</div>

					

			
			</div>
			
	);
};