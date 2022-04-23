import React, {FC, memo} from 'react';
import {IRepository} from "../../models/IRepository";
import {ReactComponent as LinkIcon} from "./../../assets/icons/link.svg";
import classNames from "classnames";
import Languages from "./RepositoryParts/Languages/Languages";
import BlockShadow from "../utils/BlockShadow/BlockShadow";
import Button from "../utils/Button/Button";
import Title from "../utils/Title/Title";
import Topics from "./RepositoryParts/Topics/Topics";
import Description from "./RepositoryParts/Description/Description";
import classes from "./Repositories.module.scss";
import {Link} from "react-router-dom";

interface PropsType extends IRepository {
}

const Repository: FC<PropsType> = memo((props) => {
    const btnHandler = () => navigator.clipboard.writeText(props.clone_url);

    const createdDate = new Date(props.created_at);
    const updatedDate = new Date(props.updated_at);

    //todo: change forks, stars, watcher on icons
    return (
        <BlockShadow className={classes.repository}>
            <Title level={3} className={classNames(classes.repository__name)}>
                Repository: {" "}
                <span className={classes.repository__nameLinks}>
                    <Link to={`/repository/${props?.owner?.login}/${props.name}`}
                          className={classes.repository__nameText}>
                        {props.name}
                    </Link>
                    {" "}
                    <a href={props.html_url} className={classes.repository__nameSvg} target="_blank" rel="noopener">
                        <LinkIcon/>
                    </a>
                </span>
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
                <div>Updated at: {updatedDate.toLocaleDateString()}</div>
                <div>Created at: {createdDate.toLocaleDateString()}</div>
            </div>
            <Button className={classes.repository__btnClone}
                    onClick={btnHandler}>Copy clone url
            </Button>
        </BlockShadow>
    );
});

export default Repository;
