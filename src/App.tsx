import React from 'react';
import {useRoutes} from "react-router-dom";
import routes from "./components/Routes/Routes";
import Header from "./components/Header/Header";
import classes from "./pages/MainPage/MainPage.module.scss";

function GitStatApp() {

    const element = useRoutes(routes);
    return (<>
            <Header/>
            <div className={classes.container}>
                {element}
            </div>
        </>
    );
}

export default GitStatApp;
