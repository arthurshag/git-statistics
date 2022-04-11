import React, {FC} from 'react';
import {useGetContributorsQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../utils/Title/Title";
import classes from "./Contributors.module.scss";
import Loading from "../../../utils/Loading/Loading";
import Error from "../../../utils/ErrorWrapper/ErrorWrapper";

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
        <Loading isLoading={isLoading}>
            <div className={classes.contributors}>
                <Title level={3}>Contributors:</Title>
                <Error error={error as string | undefined | null}>
                    <div className={classes.contributors__items}>{contributorsUI}</div>
                </Error>
            </div>
        </Loading>
    );
};


export default Contributors;
