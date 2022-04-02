import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";

interface IProps {
    owner: string,
    repo: string
}

const Languages:FC<IProps> = ({owner, repo }) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};


export default Languages;
