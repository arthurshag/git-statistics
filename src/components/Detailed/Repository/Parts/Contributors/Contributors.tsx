import React, {FC} from 'react';
import {useGetContributorsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Contributors from "../../../Parts/Contributors/Contributors";

interface IProps {
    owner: string,
    repo: string
}

const ContributorsContainer: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetContributorsQuery({owner, repo})
    return (<Contributors data={data} error={error as string | null | undefined} isLoading={isLoading}/>
    );
};


export default ContributorsContainer;
