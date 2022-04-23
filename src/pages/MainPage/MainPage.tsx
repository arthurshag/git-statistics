import React, {FC, useEffect, useState} from 'react';
import classes from "./MainPage.module.scss"
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {fetchUser} from "../../redux/reducers/UserReducer/ActionCreators";
import FormLogin from "../../components/FormLogin/FormLogin";
import Profile from "../../components/Profile/Profile";


const MainPage: FC = () => {
    //for test you can use: arthurshag, gaearon, TalisMan701
    const [login, setLogin] = useState("example")
    const dispatch = useAppDispatch()
    //todo: при каждом чихе в userReducer перендер происходит
    const {user, isLoading, error} = useAppSelector(state => state.userReducer)

    const handleClick = () => {
        dispatch(fetchUser(login))
    }

    useEffect(() => {
        dispatch(fetchUser(login))
    }, []);

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <FormLogin handleClick={handleClick} text={login} setText={setLogin} disabled={isLoading}
                           error={error}/>
                <Profile user={user} isLoading={isLoading}/>
            </div>
        </div>
    );
};

export default MainPage;
