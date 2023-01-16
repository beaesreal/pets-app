import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import header_img_1 from "../../img/header_img_1.jpg";
import Rectangle_mockup from "../../img/Rectangle_mockup.png";
import Rectangle_small from "../../img/Rectangle_small.png";
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

	return (
		<div className="container-fluid p-5 header-bg pt-5 p-sm-4">

			<div className="container-fluid header-bg">
				<div className="container p-4">
				<div className="row align-items-center p-lg-5">
					<div className="col-lg-6 col-sm-1">
						<h1 className="m-lg-5">
							The website you need for your pets.
						</h1>
						<button className="btn m-lg-5 btn-primary px-4 my-4" type="submit">Join Today</button>
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
						<div className="col-sm py-5 m-lg-3">
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

					<div className="container-fluid photo-text-section py-5 px-5">
						<div className="container-md p-lg-5">
							<div className="row align-items-center p-lg-5">
								<div className="col-sm p-3">
								<img className="d-block w-100 pb-4" src={Dalmatian} />
								</div>
							<div className="col-sm p-lg-3">
								<h4 ><b>
									Did you know that...?
								</b></h4>
								<p>
								Dalmatian dogs are hyperactive. Hence their potential, originally developed to accompany the carriage coach, something reserved for powerful animals such as horses. They are also very intelligent, domestic and servile. In fact, the Dalmatian is known as a "human dog". There is a reason for this.
								They are also stubborn. Very stubborn. And this could cause him to become dominant. Be very careful when he is a puppy or he will end up making fun of you. As we have told you, he is very intelligent. You could say this breed makes good the popular saying: "all he needs to do is talk".
								From his heritage as a carriage driver and faithful companion to humans, another very important aspect of this breed is that he cannot stand loneliness and inactivity.
								
								</p>
							</div>
						</div>
						</div>
					</div>

					<div className="container ">
						<div className="row text-center mt-4 pt-5">
							<h2>How to start?</h2>
							<h4>Four simple steps to follow</h4>
						</div>
						<div className="container text-center">
						<div className="row py-5 px-2">
						<div className="col-lg-3 col-md-2 col-sm-1">
							<img className="d-block w-100 pb-4" src={Img_4} />
								<h5>
									Register
								</h5>
								<p>
									We will only need your username and an email address.
								</p>
							</div>
						<div className="col-lg-3 col-md-2 col-sm-1">
							<img className="d-block w-100 pb-4" src={Img_5} />
								<h5>
									Log in
								</h5>
								<p>
									Log in to your account and add further details if necessary.
								</p>
						</div>
						<div className="col-lg-3 col-md-2 col-sm-1">
							<img className="d-block w-100 pb-4" src={Img_6} />
								<h5>
									Add your animals
								</h5>
								<p>
								You can add their profile picture, age, weight and much more.
								</p>
						</div>
						<div className="col-lg-3 col-md-2 col-sm-1">
						<img className="d-block w-100 pb-4" src={Img_7} />
							<h5>
								Enjoy the website
							</h5>
							<p>
								Enjoy discovering all the features it offers... it's free!
							</p>
						</div>
						</div>
						</div>
					</div>

			
				</div>
			
	);
};
