import React, {FC} from "react";
import {Link} from "react-router-dom";
import classes from "./LinkGit.module.scss";
import classNames from "classnames";
import {MarkGithubIcon} from "@primer/octicons-react";
import IconWrapper from "../IconWrapper/IconWrapper";

interface IProps {
    githubUrl?: string,
    inner?: { url: string, text: string },
    className?: string
}


const LinkGit: FC<IProps> = ({
                                 githubUrl, inner,
                                 className
                             }) => {
    return <span className={classNames(classes.link, className)}>
        {inner && <Link to={inner.url} className={classes.inner}>{inner.text}</Link>}
        {githubUrl && <span>
            {inner && " | "}
            <a href={githubUrl} className={classes.github} target="_blank" rel="noopener">
            <IconWrapper Icon={MarkGithubIcon}/>
        </a>
        </span>}
    </span>;

}

export default LinkGit;
