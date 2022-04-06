import React, {FC, useEffect, useState} from 'react';
import classes from "./MainPage.module.scss"
import Header from "../../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {fetchUser} from "../../redux/reducers/UserReducer/ActionCreators";
import FormLogin from "../../components/FormLogin/FormLogin";
import Profile from "../../components/Profile/Profile";
import RepositoriesContainer from "../../components/Repositories/RepositoriesContainer";


const MainPage: FC = () => {
    //for test you can use: arthurshag, gaearon, TalisMan701
    const [login, setLogin] = useState("example")
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.userReducer.user)
    const isLoading = useAppSelector(state => state.userReducer.isLoading)
    const error = useAppSelector(state => state.userReducer.error)

    const handleClick = () => {
        dispatch(fetchUser(login))
    }

    useEffect(() => {
        dispatch(fetchUser(login))
    }, []);

    return (
        <>
            <Header/>
            <div className={classes.container}>
                <FormLogin handleClick={handleClick} text={login} setText={setLogin} disabled={isLoading}
                           error={error}/>
                <Profile user={user} isLoading={isLoading}/>
                <RepositoriesContainer/>
            </div>
        </>
    );
};

export default MainPage;
