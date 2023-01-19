import React, {useContext} from "react";
import { Context } from "../store/appContext";

export const LogoutButton = () => {
    const { actions } = useContext(Context);
    return (
        <div>
            <a href="/profile"><button className="btn btn-primary my-2 my-sm-0 px-4 mx-2" type="submit">My account</button></a>
            <button 
            className="btn btn-outline-primary my-2 my-sm-0 px-4 m-2" 
            type="button"
            onClick={actions.handleLogout}
            >
                Logout
            </button>
        </div>
    )
}