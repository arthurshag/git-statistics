import React, {FC} from 'react';
import {useGetContributorsQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import LoadingError from "./LoadingError";
import {Link} from "react-router-dom";

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
        <LoadingError isLoading={isLoading} error={error as string | undefined | null}>
            <h4>Contributors:</h4>
            <div>{contributorsUI}</div>
            <Link to={"/"}>hohol</Link>
        </LoadingError>
    );
};


export default Contributors;
