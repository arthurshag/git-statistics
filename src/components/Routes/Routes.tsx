import React from "react";

import MainPage from "../../pages/MainPage/MainPage";
import AuthContainer from "../../pages/Auth/Auth";
import {Navigate, RouteObject} from "react-router-dom";

const routes:RouteObject[] = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: "login",
        element: <AuthContainer/>
    },
    {
        path: "*",
        element: (<Navigate to="/" replace />)
    }
]

export default routes;
