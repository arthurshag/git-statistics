import React, {FC, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {checkIsAuth} from "../../redux/reducers/ProfileReducer/ActionCreators";
import Loading from "../../components/utils/Loading/Loading";
import Profile from '../../components/Auth/Profile/Profile';
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import BlockShadow from "../../components/utils/BlockShadow/BlockShadow";
import Title from "../../components/utils/Title/Title";
import classes from "./Auth.module.scss";

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
                    <Link className={classes.auth__hrefHome} to={"/"}>BACK TO APP</Link>
                    <BlockShadow className={classes.auth__formWrapper}>
                        <Title level={1} className={classes.auth__title}>Github Statistics</Title>
                        <Loading isLoading={loading} className={classes.auth__loading}>
                            {user !== null
                                ? <Profile user={user}/>
                                : <AuthForm/>
                            }
                        </Loading>
                    </BlockShadow>
                </div>
            </div>
        </section>
    );
};

export default AuthContainer;
