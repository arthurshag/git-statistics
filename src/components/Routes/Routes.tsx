import React from "react";

import MainPage from "../../pages/MainPage/MainPage";
import AuthContainer from "../../pages/Auth/Auth";
import {Navigate, RouteObject} from "react-router-dom";
import RepositoriesPage from "../../pages/Repositories/RepositoriesPage";
import UserDetailed from "../../pages/UserDetailed/UserDetailed";
import RepositoryDetailed from "../../pages/RepositoryDetailed/RepositoryContainer";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path: "user",
        element: <UserDetailed/>,
        children: [
            {
                path: ":username", element: <UserDetailed/>,
            }
        ]
    },
    {
        path: "login",
        element: <AuthContainer/>
    },
    {
        path: "repository",
        element: <RepositoryDetailed/>,
        children: [
            {
                path: ":user", element: <RepositoryDetailed/>,
                children: [{path: ":repo", element: <RepositoryDetailed/>}]
            }
        ]
    },
    {
        path: "/repositories",
        element: (<RepositoriesPage/>)
    },
    {
        path: "*",
        element: (<Navigate to="/" replace/>)
    },
]

export default routes;
