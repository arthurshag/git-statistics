import React, {FC, memo} from 'react';
import {IRepository} from "../../models/IRepository";
import classes from "./Repositories.module.scss";
import {ReactComponent as LinkIcon} from "./../../assets/icons/link.svg";

interface PropsType extends IRepository {
}

const Repository: FC<PropsType> = memo((props) => {

    const topicsUI = props.topics.map((e) => {
        return <div key={e} className={classes.repository__topic}>{e}</div>
    })

    return (
        <section className={classes.repository}>
            <div className={[classes.repository__item, classes.repository__name].join(" ")}>
                <span>Repository: {props.name}</span> <a href={props.html_url}><LinkIcon/></a>
            </div>
            <div className={classes.repository__item}>Owner: {props.owner.login}</div>
            <div className={classes.repository__item}>Count forks: {props.forks_count}</div>
            <div className={[classes.repository__item, classes.repository__topics].join(" ")}>
                <span>Topics:</span>
                <div className={classes.repository__topicsItems}>{topicsUI.length ? topicsUI : "not specified"}</div>
            </div>
            <div className={classes.repository__item}>Watchers count: {props.watchers_count}</div>
            <div className={classes.repository__item}>Stargazers count: {props.stargazers_count}</div>
            <div className={classes.repository__item}>Description: {props.description || "not specified"}</div>
            <div className={classes.repository__item}>Languages: {Object.keys(props.languages).join(", ") || "not specified"}</div>
            <div className={classes.repository__item}>
                <div>Created at: {props.created_at}</div>
                <div>Updated at: {props.updated_at}</div>
            </div>
            <button className={classes.repository__btnClone}
                    onClick={() => navigator.clipboard.writeText(props.clone_url)}>Copy clone url
            </button>
        </section>
    );
});

export default Repository;
