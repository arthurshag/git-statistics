import React, {FC} from 'react';
import {useGetContributorsQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";

interface IProps {
    owner: string,
    repo: string
}

const Contributors:FC<IProps> = ({owner, repo }) => {
    const {data, error, isLoading} = useGetContributorsQuery({owner, repo})

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};


export default Contributors;
