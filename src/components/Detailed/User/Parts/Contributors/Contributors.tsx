import React, {FC} from 'react';
import Title from "../../../../utils/Title/Title";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import {ReactComponent as Icon} from "../../../../../assets/icons/link.svg";
import {Link} from "react-router-dom";
import {useCollaboratorsByAllRepos} from "../../../../../redux/reducers/UserReducer/useGetCommitsByAllRepos";
import BlockShadow from "../../../../utils/BlockShadow/BlockShadow";
import classes from "./Contributors.module.scss";

interface IProps {
    user: string,
}

const Contributors: FC<IProps> = ({user}) => {
    const {data, error, isLoading} = useCollaboratorsByAllRepos(user);
    const contributorsUI = data?.map((c) => {
        return <BlockShadow key={c.id} className={classes.contributor}>
            <Link to={`/user/${c.login}`} className={classes.contributor__login}>{c.login}</Link>{" "}
            <a href={c.html_url} target="_blank" rel="noopener">
                <Icon/>
            </a>
            <div className={classes.contributor__img}><img src={c.avatar_url}/></div>
            <span>Intersected in repos {c.count} times</span>
        </BlockShadow>
    })

    return (
        <div>
            <Title level={3}>Contributors:</Title>
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
