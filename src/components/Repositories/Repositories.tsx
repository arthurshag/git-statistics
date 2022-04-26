import React, {FC, memo, useState} from 'react';
import Repository from "./Repository";
import classes from "./Repositories.module.scss";
import {IRepository} from "../../models/IRepository";
import Button from "../utils/Button/Button";
import IconWrapper from "../utils/IconWrapper/IconWrapper";
import {CopyIcon, ListUnorderedIcon} from "@primer/octicons-react";
import classNames from "classnames";

interface PropsType {
    repositories: IRepository[]
}

const Repositories: FC<PropsType> = memo(({repositories}) => {
    const [type, changeType] = useState<"list" | "tile">("list");
    const UIRepos = repositories.map((props) => {
        return <Repository key={props.id} {...props} type={type}/>
    });


    return (
        <>
            <Button onClick={() => changeType("list")}><IconWrapper Icon={ListUnorderedIcon} /></Button>
            <Button onClick={() => changeType("tile")}><IconWrapper Icon={CopyIcon} /></Button>
            <div className={classes.repositories}>
                <div className={classNames(classes.repositories__wrapper, type === "tile" && classes.repositories__wrapper_tile)}>
                    {UIRepos}
                </div>
            </div>
        </>
    );
});

export default Repositories;
