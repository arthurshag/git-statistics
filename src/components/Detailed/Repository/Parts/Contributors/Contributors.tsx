import React, {FC} from 'react';
import {useGetContributorsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../../utils/Title/Title";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import {ReactComponent as Icon} from "../../../../../assets/icons/link.svg";
import {Link} from "react-router-dom";
import classes from "./Contributors.module.scss";

interface IProps {
    owner: string,
    repo: string
}

const Contributors: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetContributorsQuery({owner, repo})
    const contributorsUI = data?.map((c) => {
        return <React.Fragment key={c.id}>
            <span>
                <Link to={`users/${c.login}`}>{c.login}</Link>{" "}
                <a href={c.html_url} className={classes.contributors__iconLink} target="_blank" rel="noopener">
                    <Icon/>
                </a>
            </span> {" "}
        </React.Fragment>
    })

    return (
        <Loading isLoading={isLoading}>
            <div className={classes.contributors}>
                <Title level={3}>Contributors:</Title>
                <ErrorGate error={error as string | undefined | null}>
                    <div className={classes.contributors__items}>{contributorsUI}</div>
                </ErrorGate>
            </div>
        </Loading>
    );
};


export default Contributors;
