import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import header_img_1 from "../../img/header_img_1.jpg";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div classNameName="container-fluid p-5 header-bg align-items-center pt-5">
			

			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div className="carousel-inner header-bg px-5">
					<div className="carousel-item active px-5">
						<div className="row">
						<div className="col-4 p-5">
							<h1 className="py-5">
							Sed ut perspiciatis unde omnis
							</h1>
							<button class="btn btn-primary my-sm-0 px-4" type="submit">Join Today</button>
						</div>
						
						<div className="col-8 p-5">
						<img className="d-block w-100" src={header_img_1} alt="First slide"/>
						</div>
						</div>
					</div>
					<div className="carousel-item">
					<img className="d-block w-100" src="..." alt="Second slide"/>
					</div>
					<div className="carousel-item">
					<img className="d-block w-100" src="..." alt="Third slide"/>
					</div>
				</div>
				<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>

				</div>

				<div class="container">
					<div class="row">
						<div class="col-sm py-5 m-3">
						<img className="d-block w-100 pb-4" src={header_img_1} />
							<h5>
								Sed ut perspiciatis
							</h5>
							<p>
								Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
							</p>
							<a>
								Learn more
							</a>
						</div>
						<div class="col-sm py-5 m-3">
						<img className="d-block w-100 pb-4" src={header_img_1} />
							<h5>
								Sed ut perspiciatis
							</h5>
							<p>
								Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
							</p>
							<a>
								Learn more
							</a>
						</div>
						<div class="col-sm py-5 m-3">
						<img className="d-block w-100 pb-4" src={header_img_1} />
							<h5>
								Sed ut perspiciatis
							</h5>
							<p>
								Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
							</p>
							<a>
								Learn more
							</a>
						</div>
					</div>
					</div>

					<div className="container-fluid section-separator">
						Section 2
					</div>

				</div>
			
	);
};
