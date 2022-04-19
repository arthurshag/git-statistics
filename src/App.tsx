import React from 'react';
import {useRoutes} from "react-router-dom";
import routes from "./components/Routes/Routes";

function GitStatApp() {
    const element = useRoutes(routes);
    return (<>{
            element
        }</>
    );
}

export default GitStatApp;
