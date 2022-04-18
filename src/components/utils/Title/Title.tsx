import React, {FC} from 'react';
import classes from "./Title.module.scss";
import classNames from "classnames";

interface IProps {
    level?: 1 | 2 | 3 | 4,
    className?: string
}

const titles = ["h1", "h2", "h3", "h4"] as const;


const Title: FC<IProps> = ({
                               className,
                               children,
                               level = 1
                           }) => {
    return React.createElement(titles[level - 1], {
        className: classNames(classes.title, classes[`title_${level}`], className),
        children
    });
}

export default Title;
