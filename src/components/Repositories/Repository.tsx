import React, {FC, memo} from 'react';
import {IRepository} from "../../models/IRepository";
import classNames from "classnames";
import Languages from "./RepositoryParts/Languages/Languages";
import BlockShadow from "../utils/BlockShadow/BlockShadow";
import Button from "../utils/Button/Button";
import Title from "../utils/Title/Title";
import Topics from "./RepositoryParts/Topics/Topics";
import Description from "./RepositoryParts/Description/Description";
import LinkGit from "../utils/LinkGit/LinkGit";
import IconWrapper from "../utils/IconWrapper/IconWrapper";
import {CopyIcon, EyeIcon, RepoForkedIcon, StarFillIcon} from "@primer/octicons-react";
import classes from "./Repositories.module.scss";

interface PropsType extends IRepository {
    type?: "list" | "tile"
}

const Repository: FC<PropsType> = memo((props) => {
    const btnHandler = () => navigator.clipboard.writeText(props.clone_url);

    const createdDate = new Date(props.created_at);
    const updatedDate = new Date(props.updated_at);

    return (
        <BlockShadow className={classNames(classes.repository, props.type === "list" && classes.repository_list)}>
            <Title level={3} className={classNames(classes.repository__name)}>
                Repository: {" "}
                <span className={classes.repository__nameLinks}>
                    <LinkGit inner={{url: `/repository/${props?.owner?.login}/${props.name}`, text: props.name}}
                             githubUrl={props.html_url}/>
                </span>
            </Title>
            <section className={classes.repository__data}>
                <div className={classes.repository__owner}>
                    {props.owner && <div className={classes.repository__ownerName}>
                        Owner:
                        <div><LinkGit inner={{url: `/user/${props.owner.login}`, text: props.owner.login}}
                                      githubUrl={props.owner?.html_url}/></div>
                    </div>}
                    <img src={props.owner?.avatar_url} alt={"avatar"} className={classes.repository__ownerImg}/>
                </div>
                <div className={classes.repository__item}>
                    <IconWrapper Icon={StarFillIcon}/> Stars: {props.stargazers_count}
                </div>
                <div className={classes.repository__item}>
                    <IconWrapper Icon={EyeIcon}/> Watchers: {props.watchers_count}
                </div>
                <div className={classes.repository__item}>
                    <IconWrapper Icon={RepoForkedIcon}/> Forks: {props.forks_count}
                </div>
                {props.topics && props.topics.length !== 0 &&
                <Topics topics={props.topics} className={classes.repository__item}/>
                }
                {props.description &&
                <Description description={props.description} className={classes.repository__item}/>}
                {props.owner &&
                <Languages owner={props.owner.login} repo={props.name} className={classes.repository__item}/>}
                <div className={classes.repository__item}>
                    <div>Updated at: {updatedDate.toLocaleDateString()}</div>
                    <div>Created at: {createdDate.toLocaleDateString()}</div>
                </div>
                <Button className={classes.repository__btnClone}
                        onClick={btnHandler}><IconWrapper Icon={CopyIcon}
                                                          className={classes.repository__btnCloneIcon}/> Copy clone url
                </Button>
            </section>
        </BlockShadow>
    );
});

export default Repository;
