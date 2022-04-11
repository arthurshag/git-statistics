import React, {FC, memo} from 'react';
import Repository from "./Repository";
import classes from "./Repositories.module.scss";
import {IRepository} from "../../models/IRepository";
import Title from "../utils/Title/Title";

interface PropsType {
    repositories: IRepository[]
}

const Repositories: FC<PropsType> = memo(({repositories}) => {
    const UIRepos = repositories.map((props) => {
        return <Repository key={props.id} {...props} />
    });

    return (
        <div className={classes.repositories}>
            <Title level={2}>Repositories</Title>
            <div className={classes.repositories__wrapper}>{UIRepos}</div>
        </div>
    );
});

export default Repositories;
