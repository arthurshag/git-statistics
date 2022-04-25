import React, {FC, useEffect, useState} from 'react';
import classes from './User.module.scss'
import FormLogin from "../FormLogin/FormLogin";
import Profile from "../Profile/Profile";
import {fetchUser} from "../../redux/reducers/UserReducer/ActionCreators";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {IUser, IUserWithLoading} from "../../models/IUser";
import {userSlice} from "../../redux/reducers/UserReducer/UserSlice";

interface UserProps {
    user: IUserWithLoading,
    index: number
}

const User: FC<UserProps> = ({user, index}) => {
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(fetchUser(user.login, index))
    }

    const deleteUser = () => {
        dispatch(userSlice.actions.deleteUser(index))
    }

    const setText = (text: string) => {
        dispatch(userSlice.actions.changeUserLogin({login: text, index: index}))
    }

    useEffect(() => {
        dispatch(fetchUser(user.login, index))
        /*getContributions()
            .then(data => {
                setDataContribution(data.data.user.contributionsCollection.contributionCalendar)
                console.log(data.data.user.contributionsCollection.contributionCalendar)
            })*/
    }, []);

    return (
        <div className={classes.userContainer} key={`user${index}`}>
            <FormLogin handleClick={handleClick} text={user.login} setText={setText} disabled={user.isLoading}
                       error={user.error}/>
            <Profile user={user} deleteUser={index > 0 ? deleteUser: undefined}/>
        </div>
    );
};

export default User;