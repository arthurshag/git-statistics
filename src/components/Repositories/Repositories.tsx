import React, {FC, memo} from 'react';
import Repository from "./Repository";
import classes from "./Repositories.module.scss";
import {IRepository} from "../../models/IRepository";

interface PropsType {
    repositories: IRepository[]
}

const Repositories: FC<PropsType> = memo(({repositories}) => {
    const UIRepos = repositories.map((props) => {
        return <Repository key={props.id} {...props} />
    });

    return (
        <div className={classes.repositories}>
            <div className={classes.repositories__wrapper}>{UIRepos}</div>
        </div>
    );
});

export default Repositories;
