import React, {FC} from 'react';
import {useCollaboratorsByAllRepos} from "../../../../../redux/reducers/UserReducer/useGetCommitsByAllRepos";
import Contributors from "../../../Parts/Contributors/Contributors";

interface IProps {
    user: string,
}

const ContributorsContainer: FC<IProps> = ({user}) => {
    const {data, error, isLoading} = useCollaboratorsByAllRepos(user);
    return (<Contributors data={data} error={error as string | null | undefined} isLoading={isLoading}/>);
};


export default ContributorsContainer;


