import React, {FC} from 'react';
import classes from "./Header.module.scss"
import {Link} from "react-router-dom";

const Header: FC = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.logo}>Github Statistics</div>
                <Link to={"/login"} className={classes.auth}>Auth</Link>
            </div>
        </header>
    );
};

export default Header;
