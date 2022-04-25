import React, {FC} from 'react';
import {PeopleIcon} from "@primer/octicons-react";
import IconWrapper from "../../../utils/IconWrapper/IconWrapper";
import Title from "../../../utils/Title/Title";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";
import LinkGit from "../../../utils/LinkGit/LinkGit";
import BlockShadow from "../../../utils/BlockShadow/BlockShadow";
import {IContributors} from "../../../../models/IContributors";
import classes from "./Contributors.module.scss";


interface IProps {
    data: (IContributors[0] & { count?: number })[] | undefined,
    isLoading: boolean,
    error: string | null | undefined
}

const Contributors: FC<IProps> = ({data, error, isLoading}) => {
    const contributorsUI = data?.map((c) => {
        return <BlockShadow key={c.id} className={classes.contributor}>
            <LinkGit inner={{url: `/user/${c.login}`, text: c.login || ""}} githubUrl={c.html_url}/>
            <div className={classes.contributor__img}><img src={c.avatar_url}/></div>
            {c.count && <span>Intersected in repos {c.count} times</span>}
        </BlockShadow>
    })

    return (
        <div>
            <Title level={3}><IconWrapper Icon={PeopleIcon}/> Contributors:</Title>
            <Loading isLoading={isLoading}>
                <ErrorGate error={error as string | undefined | null}>
                    <div className={classes.contributors__wrapper}>
                        <div className={classes.contributors__list}>
                            {contributorsUI && contributorsUI?.length > 0 ? contributorsUI : "There nothing"}
                        </div>
                    </div>
                </ErrorGate>
            </Loading>
        </div>
    );
};

export default Contributors;
