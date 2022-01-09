import React from "react";
import './Layout.scss';
import {Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";
import {Auth} from "../auth/Auth";
import {Users} from "../users/Users";
import {StorageService} from "../../servises/StorageService";

export  const Layout = () => {

    function PrivateRoute() {
        const auth: boolean | undefined = StorageService.isLoggedIn()
        const location = useLocation()
        return auth ?
            <Outlet /> :
            <Navigate to={{
                pathname: "/login",
                search: new URLSearchParams({ redirect: location.pathname }).toString()
            }} />
    }

    function PublicRoute() {
        const auth: boolean | undefined = StorageService.isLoggedIn()
        return !auth ?
            <Outlet /> :
            <Navigate to="/users" />
    }

    return(
        <div className='layoutWrapper'>
            <Routes>
                <Route path="/" element={<PublicRoute />}>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Auth/>} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                <Route path="auth" element={<Auth/>} />
                <Route path="users" element={<Users/>} />
            </Route>
            </Routes>
        </div>
    )
}
