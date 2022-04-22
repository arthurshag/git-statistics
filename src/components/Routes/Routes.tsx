import React from "react";

import MainPage from "../../pages/MainPage/MainPage";
import AuthContainer from "../../pages/Auth/Auth";
import {Navigate, RouteObject} from "react-router-dom";
import Repository from "../Repository/RepositoryContainer";
import RepositoriesPage from "../../pages/Repositories/RepositoriesPage";
import UserDetailed from "../UserDetailed/UserDetailed";

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
        element: <Repository/>,
        children: [
            {
                path: ":owner", element: <Repository/>,
                children: [{path: ":repo", element: <Repository/>}]
            }
        ]
    },
    // {
    //     path: "*",
    //     element: (<Navigate to="/" replace />)
    // }
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
