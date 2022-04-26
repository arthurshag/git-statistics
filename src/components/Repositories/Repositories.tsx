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
    const [type, changeType] = useState<"list" | "tile">("tile");
    const UIRepos = repositories.map((props) => {
        return <Repository key={props.id} {...props} type={type}/>
    });

    return (
        <>
            <Button onClick={() => changeType("tile")} type={type === "tile" ? "primary" : undefined}>
                <IconWrapper Icon={CopyIcon} />
            </Button>
            <Button onClick={() => changeType("list")} type={type === "list" ? "primary" : undefined}>
                <IconWrapper Icon={ListUnorderedIcon} />
            </Button>
            <div className={classes.repositories}>
                <div className={classNames(classes.repositories__wrapper, type === "list" && classes.repositories__wrapper_list)}>
                    {UIRepos}
                </div>
            </div>
        </>
    );
});

export default Repositories;
