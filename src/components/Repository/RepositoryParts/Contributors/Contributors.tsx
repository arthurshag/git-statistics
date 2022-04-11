import React, {FC} from 'react';
import {useGetContributorsQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../utils/Title/Title";
import classes from "./Contributors.module.scss";

interface IProps {
    owner: string,
    repo: string
}

const Contributors: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetContributorsQuery({owner, repo})
    const contributorsUI = data?.map((c) => {
        return <React.Fragment key={c.id}><a href={c.html_url}>{c.login}</a> {" "}</React.Fragment>
    })

    return (
        <div className={classes.contributors}>
            <Title level={3}>Contributors:</Title>
            <div className={classes.contributors__items}>{contributorsUI}</div>
        </div>
    );
};


export default Contributors;
