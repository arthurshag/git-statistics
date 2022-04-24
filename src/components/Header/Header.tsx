import React, {FC} from 'react';
import classes from "./Header.module.scss"
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/reduxHooks";
import IconWrapper from "../utils/IconWrapper/IconWrapper";
import {FeedPersonIcon, MarkGithubIcon} from "@primer/octicons-react";

const Header: FC = () => {
    const user = useAppSelector(state => state.profileReducer.user);
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to={"/"} className={classes.link}><IconWrapper Icon={MarkGithubIcon}/> Github Statistics</Link>
                <Link to={"/login"} className={classes.link}>
                    <IconWrapper Icon={FeedPersonIcon}/> {user ? user.login : "Auth"}
                </Link>
            </div>
        </header>
    );
};

export default Header;
