import React, {FC} from 'react';
import {IRepository} from "../../../../../models/IRepository";
import Title from "../../../../utils/Title/Title";
import {Link} from "react-router-dom";
import {ReactComponent as Icon} from "../../../../../assets/icons/link.svg";
import classes from "./Owner.module.scss";

interface IProps {
    owner: NonNullable<IRepository["owner"]>
}

const Owner: FC<IProps> = ({owner}) => {
    return (<div className={classes.owner}>
        <div className={classes.ownerData}>
            <Title level={3}>Owner:{" "}
                <Link to={`users/${owner.login}`}>{owner.login}</Link> {" "}
                <a href={owner.html_url} target="_blank" rel="noopener">
                    <Icon/>
                </a>
            </Title>
            <div className={classes.ownerType}>Type: {owner.type}</div>
            {owner.email && <div className={classes.ownerType}>Email: {owner.email}</div>}
        </div>
        <div className={classes.ownerBlockImg}><img src={owner.avatar_url}/></div>
    </div>);
};


export default Owner;
