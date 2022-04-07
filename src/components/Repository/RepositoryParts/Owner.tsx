import React, {FC} from 'react';
import {IRepository} from "../../../models/IRepository";
import classes from "./../Repository.module.scss";

interface IProps {
    owner: NonNullable<IRepository["owner"]>
}

const Owner: FC<IProps> = ({owner}) => {
    return (<div className={classes.owner}>
        <div className={classes.owner__name}>Owner: <a href={owner.html_url}>{owner.login}</a></div>
        <div className={classes.owner__type}>Type: {owner.type}</div>
        <div className={classes.owner__img}><img src={owner.avatar_url}/></div>
    </div>);
};


export default Owner;
