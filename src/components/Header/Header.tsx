import React, {FC} from 'react';
import classes from "./Header.module.scss"

const Header: FC = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.logo}>Github Statistics</div>
            </div>
        </header>
    );
};

export default Header;
