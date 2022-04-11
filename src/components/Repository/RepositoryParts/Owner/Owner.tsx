import React, {FC} from 'react';
import {IRepository} from "../../../../models/IRepository";
import Title from "../../../utils/Title/Title";
import classes from "./Owner.module.scss";

interface IProps {
    owner: NonNullable<IRepository["owner"]>
}

const Owner: FC<IProps> = ({owner}) => {
    return (<div className={classes.owner}>
        <div className={classes.ownerData}>
            <Title level={3}>Owner: <a href={owner.html_url}>{owner.login}</a></Title>
            <div className={classes.ownerType}>Type: {owner.type}</div>
            {owner.email && <div className={classes.ownerType}>Email: {owner.email} 123</div>}
        </div>
        <div className={classes.ownerBlockImg}><img src={owner.avatar_url}/></div>
    </div>);
};


export default Owner;
