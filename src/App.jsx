import { useState } from "react";
import "./App.css";

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
// import pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<Registration />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                    path="/forgotpassword"
                    element={<ForgotPassword />}
                ></Route>
                <Route path="/otp/:email" element={<Otp />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/changepassword" element={<ChangePassword />}></Route>
            </Route>
        )
    );
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
