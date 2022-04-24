import React, {FC} from 'react';
import {useAppSelector} from "../../redux/hooks/reduxHooks";
import Loading from "../../components/utils/Loading/Loading";
import Profile from '../../components/Auth/Profile/Profile';
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import BlockShadow from "../../components/utils/BlockShadow/BlockShadow";
import Title from "../../components/utils/Title/Title";
import classes from "./Auth.module.scss";

const AuthContainer: FC = () => {
    const user = useAppSelector((state) => state.profileReducer.user);
    const loading = useAppSelector((state) => state.profileReducer.isAuthLoading);

    return (
        <section className={classes.auth}>
            <div className={classes.auth__wrapper}>
                <div className={classes.auth__wrapperInner}>
                    <BlockShadow className={classes.auth__formWrapper}>
                        <Title level={1} className={classes.auth__title}>Github Statistics</Title>
                        <p className={classes.auth__p}>
                            Welcome to the github statistics website. On this site you can see visualized statistics
                            based on the open api of github</p>
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
