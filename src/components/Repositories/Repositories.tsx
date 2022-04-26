import React, {FC, memo, useState} from 'react';
import Repository from "./Repository";
import classes from "./Repositories.module.scss";
import {IRepository} from "../../models/IRepository";
import Button from "../utils/Button/Button";
import IconWrapper from "../utils/IconWrapper/IconWrapper";
import {CopyIcon, ListUnorderedIcon} from "@primer/octicons-react";
import classNames from "classnames";

interface PropsType {
    repositories: IRepository[],
    type: "list" | "tile"
}

const Repositories: FC<PropsType> = memo(({repositories, type}) => {
    const UIRepos = repositories.map((props) => {
        return <Repository key={props.id} {...props} type={type}/>
    });

    return (
        <div className={classes.repositories}>
            <div
                className={classNames(classes.repositories__wrapper, type === "list" && classes.repositories__wrapper_list)}>
                {UIRepos}
            </div>
        </div>
    );
});

export default Repositories;
