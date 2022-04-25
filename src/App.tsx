import React, {useEffect} from 'react';
import {useRoutes} from "react-router-dom";
import routes from "./components/Routes/Routes";
import Header from "./components/Header/Header";
import classes from "./pages/MainPage/MainPage.module.scss";
import {useAppDispatch} from "./redux/hooks/reduxHooks";
import {checkIsAuth} from "./redux/reducers/ProfileReducer/ActionCreators";

function GitStatApp() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkIsAuth());
    }, []);

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
