import React, {FC} from 'react';
import classes from "./Header.module.scss"
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/reduxHooks";

const Header: FC = () => {
    const user = useAppSelector(state => state.profileReducer.user);
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.logo}>Github Statistics</div>
                <Link to={"/login"} className={classes.auth}>{user ? user.login : "Auth"}</Link>
            </div>
        </header>
    );
};

export default Header;
