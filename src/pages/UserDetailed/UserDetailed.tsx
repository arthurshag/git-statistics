import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import BlockShadow from "../../components/utils/BlockShadow/BlockShadow";
import classes from "./UserDetailed.module.scss";
import Title from "../../components/utils/Title/Title";
import Profile from "../../components/Detailed/User/Parts/Profile/Profile";
import LanguagesContainer from "../../components/Detailed/User/Parts/Languages/Languages";
import CommitsContainer from "../../components/Detailed/User/Parts/Commits/Commits";
import Contributors from "../../components/Detailed/User/Parts/Contributors/Contributors";


const User: FC = () => {
    const params = useParams();
    const username = params.username || "";
    return (
        <BlockShadow className={classes.wrapper}>
            <Title level={1} className={classes.title}>User In Detail</Title>
            <Profile username={username}/>
            <LanguagesContainer user={username}/>
            <CommitsContainer user={username}/>
            <Contributors user={username}/>
        </BlockShadow>
    );
};


export default User;
