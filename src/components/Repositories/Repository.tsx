import React, {FC, memo} from 'react';
import {IRepository} from "../../models/IRepository";
import {ReactComponent as LinkIcon} from "./../../assets/icons/link.svg";
import classNames from "classnames";
import Languages from "./RepositoryParts/Languages/Languages";
import BlockShadow from "../utils/BlockShadow/BlockShadow";
import Button from "../utils/Button/Button";
import Title from "../utils/Title/Title";
import Topics from "./RepositoryParts/Topics/Topics";
import classes from "./Repositories.module.scss";
import Description from "./RepositoryParts/Description/Description";

interface PropsType extends IRepository {
}

const Repository: FC<PropsType> = memo((props) => {
    const btnHandler = () => navigator.clipboard.writeText(props.clone_url);

    return (
        <BlockShadow className={classes.repository}>
            <Title level={3} className={classNames(classes.repository__name)}>
                Repository: {" "}
                <a href={props.html_url}>
                    <span className={classes.repository__nameText}>{props.name}</span> {" "}
                    <span className={classes.repository__nameSvg}><LinkIcon/></span>
                </a>
            </Title>
            <div className={classes.repository__owner}>
                <div className={classes.repository__ownerName}>Owner: {props?.owner?.login}</div>
                <img src={props.owner?.avatar_url} alt={"avatar"} className={classes.repository__ownerImg}/>
            </div>
            <div className={classes.repository__item}>Count forks: {props.forks_count}</div>
            <div className={classes.repository__item}>Watchers count: {props.watchers_count}</div>
            <div className={classes.repository__item}>Stargazers count: {props.stargazers_count}</div>
            {props.topics && props.topics.length !== 0 &&
            <Topics topics={props.topics} className={classes.repository__item}/>
            }
            {props.description && <Description description={props.description} className={classes.repository__item}/>}
            {props.owner &&
            <Languages owner={props.owner.login} repo={props.name} className={classes.repository__item}/>}
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
