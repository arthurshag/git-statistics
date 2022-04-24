import React, {FC} from 'react';
import {useGetContributorsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../../utils/Title/Title";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import classes from "./Contributors.module.scss";
import BlockShadow from "../../../../utils/BlockShadow/BlockShadow";
import LinkGit from "../../../../utils/LinkGit/LinkGit";
import {PeopleIcon} from "@primer/octicons-react";
import IconWrapper from "../../../../utils/IconWrapper/IconWrapper";

interface IProps {
    owner: string,
    repo: string
}

const Contributors: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetContributorsQuery({owner, repo})
    const contributorsUI = data?.map((c) => {
        return <BlockShadow key={c.id} className={classes.contributor}>
            <LinkGit inner={{url: `/user/${c.login}`, text: c.login || ""}} githubUrl={c.html_url}/>
            <div className={classes.contributor__img}><img src={c.avatar_url}/></div>
        </BlockShadow>
    })

    return (
        <div>
            <Title level={3}><IconWrapper Icon={PeopleIcon}/> Contributors:</Title>
            <Loading isLoading={isLoading}>
                <ErrorGate error={error as string | undefined | null}>
                    <div className={classes.contributors__list}>
                        {contributorsUI && contributorsUI?.length > 0 ? contributorsUI : "There nothing"}
                    </div>
                </ErrorGate>
            </Loading>
        </div>
    );
};


export default Contributors;
