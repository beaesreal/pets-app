import React from "react";
import { Link } from "react-router-dom";

export const LoginButtons = () => {
    return (
        <div>
            <Link to="/login"><button className="btn btn-outline-primary my-2 my-sm-0 px-4 m-2" type="submit">Log in</button></Link>
			<Link to="/signup"><button className="btn btn-primary my-2 my-sm-0 px-4 mx-2" type="submit">Register</button></Link>
        </div>
    )
}