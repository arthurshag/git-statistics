import React, {FC, memo} from 'react';
import {IRepository} from "../../models/IRepository";
import classes from "./Repositories.module.scss";
import {ReactComponent as LinkIcon} from "./../../assets/icons/link.svg";
import classNames from "classnames";
import Languages from "./RepositoryParts/Languages";
import BlockShadow from "../utils/BlockShadow/BlockShadow";
import Button from "../utils/Button/Button";

interface PropsType extends IRepository {
}

const Repository: FC<PropsType> = memo((props) => {
    const topicsUI = props.topics?.map((e) => {
        return <div key={e} className={classes.repository__topic}>{e}</div>
    })

    const btnHandler = () => navigator.clipboard.writeText(props.clone_url);
    return (
        <BlockShadow className={classes.repository}>
            <div className={classNames(classes.repository__item, classes.repository__name)}>
                <span>Repository: {props.name}</span> <a href={props.html_url}><LinkIcon/></a>
            </div>
            <div className={classes.repository__item}>Owner: {props?.owner?.login}</div>
            <div className={classes.repository__item}>Count forks: {props.forks_count}</div>
            {topicsUI?.length !== 0 &&
            <div className={classNames(classes.repository__item, classes.repository__topics)}>
                <span>Topics:</span>
                <div className={classes.repository__topicsItems}>
                    {topicsUI}
                </div>
            </div>
            }
            <div className={classes.repository__item}>Watchers count: {props.watchers_count}</div>
            <div className={classes.repository__item}>Stargazers count: {props.stargazers_count}</div>
            {props.description && <div className={classes.repository__item}>Description: {props.description}</div>}
            <div className={classes.repository__item}>
                {props.owner && <Languages owner={props.owner.login} repo={props.name}/>}
            </div>
            <div className={classes.repository__item}>
                <div>Created at: {props.created_at}</div>
                <div>Updated at: {props.updated_at}</div>
            </div>
            <Button className={classes.repository__btnClone}
                    onClick={btnHandler}>Copy clone url
            </Button>
        </BlockShadow>
    );
});

export default Repository;
