import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/reduxHooks";
import IconWrapper from "../utils/IconWrapper/IconWrapper";
import {FeedPersonIcon, MarkGithubIcon, RepoIcon} from "@primer/octicons-react";
import classes from "./Header.module.scss"
import classNames from "classnames";
import Loading from "../utils/Loading/Loading";

const Header: FC = () => {
    const user = useAppSelector(state => state.profileReducer.user);
    const isLoading = useAppSelector(state => state.profileReducer.isAuthLoading);

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to={"/"} className={classes.link}><IconWrapper Icon={MarkGithubIcon}/> Github Statistics</Link>
                <Link to={"/repositories"} className={classes.link}><IconWrapper Icon={RepoIcon}/> Repositories</Link>
                <Link to={"/login"} className={classNames(classes.link, classes.profile)}>
                    <IconWrapper Icon={FeedPersonIcon}/> {" "}
                    <Loading isLoading={isLoading} className={classes.loading}>{user ? user.login : "Auth"}</Loading>
                </Link>

            </div>
        </header>
    );
};

export default Header;
