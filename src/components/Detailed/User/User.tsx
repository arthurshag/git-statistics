import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Contributors from "./Parts/Contributors/Contributors";
import CommitsContainer from "./Parts/Commits/Commits";
import LanguagesContainer from "./Parts/Languages/Languages";
import Title from "../../utils/Title/Title";
import BlockShadow from "../../utils/BlockShadow/BlockShadow";
import Events from "./Parts/Events/Events";
import Profile from '../Parts/Profile/Profile';
import classes from "./User.module.scss";

const User: FC = () => {
    const params = useParams();
    const username = params.username || "";
    return (
        <BlockShadow className={classes.wrapper}>
            <Title level={1} className={classes.title}>User In Detail</Title>
            <Profile username={username}/>
            <div className={classes.languagesEvents}>
                <LanguagesContainer user={username}/>
                <Events username={username}/>
            </div>
            <CommitsContainer user={username}/>
            <Contributors user={username}/>
        </BlockShadow>
    );
};


export default User;
