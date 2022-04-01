import React, {FC, useEffect} from 'react';
import {Link} from "react-router-dom";
import classes from "./Auth.module.scss";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {checkIsAuth} from "../../redux/reducers/ProfileReducer/ActionCreators";
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import Profile from "../../components/Auth/Profile/Profile";

const AuthContainer: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.profileReducer.user);
    const loading = useAppSelector((state) => state.profileReducer.isAuthLoading);

    useEffect(() => {
        dispatch(checkIsAuth());
    }, [])

    return (
        <section className={classes.auth}>
            <div className={classes.auth__wrapper}>
                <div className={classes.auth__wrapperInner}>
                    <Link className={classes.auth__hrefHome} to={"/"}>BACK TO MOTHERLAND</Link>
                    <section className={classes.auth__form}>
                        <div className={classes.auth__formWrapper}>
                            {loading ?
                                "Loading..." : user !== null
                                    ? <Profile user={user}/>
                                    : <AuthForm/>
                            }
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default AuthContainer;
