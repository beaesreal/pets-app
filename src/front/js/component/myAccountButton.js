import React, {useContext} from "react";
import { Context } from "../store/appContext";

export const MyAccountButton = () => {
    const { actions } = useContext(Context);
    return (
        <div>
            <button 
            className="btn btn-primary my-2 my-sm-0 px-4 m-2 text-white" 
            type="button"
            ><a href="/profile">
                My account
            </a></button>
        </div>
    )
}