import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Profile } from "./pages/profile";
import { ProfileTreatments } from "./pages/profileTreatments";
import { ProfileAppointments } from "./pages/profileAppointments";
import { PetCare } from "./pages/petCare";
import { Events } from "./pages/events";
import { Settings } from "./pages/settings";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ResetPassword } from "./pages/resetPassword";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";
import { Footer } from "./component/footer";
import PetInfo from "./pages/petinfo";
import { Detail } from "./pages/pets";
import { Calendar } from "./component/calendar";
import Modal from "./component/addEventModal"
import PetEdit from "./pages/petedit";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Sidebar />} path="/sidebar" />
                        <Route element={<Calendar />} path="/calendar" />
                        <Route element={<Modal />} path="/modal" />
                        <Route element={<Register />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<ProfileTreatments />} path="/profile/treatments" />
                        <Route element={<ProfileAppointments />} path="/profile/appointments" />
                        <Route element={<PetCare />} path="/petcare" />
                        <Route element={<Events />} path="/events" />
                        <Route element={<Settings />} path="/settings" />
                        <Route element={<Detail />} path="/pets" />
                        <Route element={<PetInfo/>} path="/create"/>
                        <Route element={<PetEdit/>} path="/pets/edit/:id"/>
                        <Route element={<ResetPassword />} path="/resetpassword/:token"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
