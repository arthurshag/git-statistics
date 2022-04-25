import React, {FC} from 'react';
import {Icon as IconType} from "@primer/octicons-react";
import classes from "./Icon.module.scss";
import classNames from "classnames";

interface IProps {
    Icon: IconType
    className?: string
}

const IconWrapper: FC<IProps> = ({Icon, className}) => {

    return (
        <Icon className={classNames(classes.icon, className)}/>
    );
}

export default IconWrapper;
