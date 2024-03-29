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
import UserList from "./components/UserList";
import MerchantList from "./components/MerchantList";
import AddCaragory from "./pages/AddCaragory";
import ViewCatagory from "./components/ViewCatagory";
import ViewSubCatagory from "./components/ViewSubCatagory";
import AddSubCatagory from "./components/AddSubCatagory";
import AddProduct from "./components/AddProduct";
import AddVariant from "./components/AddVariant";
import ViewProduct from "./components/ViewProduct";

// import react toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                <Route
                    path="/changepassword/:token"
                    element={<ChangePassword />}
                ></Route>

                <Route path="/home" element={<Home />}>
                    <Route index  element={<MerchantList />}></Route>
                    <Route path="userlist" element={<UserList />}></Route>
                    <Route path="addcatagory" element={<AddCaragory />}></Route>
                    <Route path="viewcatagory" element={<ViewCatagory />}></Route>
                    <Route path="addsubcatagory" element={<AddSubCatagory />}></Route>
                    <Route path="viewsubcatagory" element={<ViewSubCatagory />}></Route>
                    <Route path="addproduct" element={<AddProduct />}></Route>
                    <Route path="addvariant" element={<AddVariant />}></Route>
                    <Route path="viewproduct" element={<ViewProduct />}></Route>
                </Route>
            </Route>
        )
    );
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <RouterProvider router={router} />
        </>
    );
}

export default App;
