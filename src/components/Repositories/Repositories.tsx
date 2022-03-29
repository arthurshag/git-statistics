import React, {FC, memo} from 'react';
import Repository from "./Repository";
import classes from "./Repositories.module.scss";
import {IRepository} from "../../models/IRepository";

interface PropsType {
    repositories: IRepository[]
}

const Repositories: FC<PropsType> = memo(({repositories}) => {
    const UIReps = repositories.map((props) => {
        return <Repository {...props} />
    });

    return (
        <div className={classes.repositories}>
            <h2>Repositories</h2>
            <div className={classes.repositories__wrapper}>{UIReps}</div>
        </div>
    );
});

export default Repositories;
