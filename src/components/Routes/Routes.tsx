import React from "react";

import MainPage from "../../pages/MainPage/MainPage";
import AuthContainer from "../../pages/Auth/Auth";
import {Navigate, RouteObject} from "react-router-dom";
import RepositoriesPage from "../../pages/Repositories/RepositoriesPage";

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
        path: "/repositories",
        element: (<RepositoriesPage />)
    },
    {
        path: "*",
        element: (<Navigate to="/" replace />)
    },
]

export default routes;
