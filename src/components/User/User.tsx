import React, {FC, useEffect} from 'react';
import classes from './User.module.scss'
import FormLogin from "../FormLogin/FormLogin";
import Profile from "../Profile/Profile";
import {fetchUser} from "../../redux/reducers/UserReducer/ActionCreators";
import {useAppDispatch} from "../../redux/hooks/reduxHooks";
import {IUserWithLoading} from "../../models/IUser";
import {userSlice} from "../../redux/reducers/UserReducer/UserSlice";
import BlockShadow from "../utils/BlockShadow/BlockShadow";

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
        <BlockShadow className={classes.userContainer} key={`user${index}`}>
            <FormLogin handleClick={handleClick} text={user.login} setText={setText} disabled={user.isLoading}
                       error={user.error}/>
            <Profile user={user} deleteUser={index > 0 ? deleteUser: undefined}/>
        </BlockShadow>
    );
};

export default User;
