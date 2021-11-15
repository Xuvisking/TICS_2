import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import { useSelector } from 'react-redux';

import AdminLayout from "layouts/Admin/Admin.js";
import LoginLayout from "layouts/Login/Login.js";

import { PrivateRoute } from "./routers/PrivateRoute";
import { PublicRoute } from "./routers/PublicRoute";

export const TicsApp = () => {
    
    const { id } = useSelector(state => state.auth);

    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute
                    path="/login"
                    isAuthenticated={!!id}
                    component={(props) => <LoginLayout {...props} />} />
                <PrivateRoute
                    path="/admin"
                    isAuthenticated={!!id}
                    component={(props) => <AdminLayout {...props} />} />
                <Redirect from="/" to="/Admin/Alarm" />
            </Switch>
        </BrowserRouter>
    )
};