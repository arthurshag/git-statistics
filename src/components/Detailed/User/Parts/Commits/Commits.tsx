import React, {FC} from 'react';
import Commits from "../../../Parts/Commits/Commits";
import {useGetCommitsByAllRepos} from "../../../../../redux/reducers/UserReducer/useGetCommitsByAllRepos";


interface IProps {
    user: string
}

const CommitsContainer: FC<IProps> = ({user}) => {
    const {data: serverData, error, isLoading} = useGetCommitsByAllRepos(user);
    const data = serverData?.map(({commit}) => ({created_at: commit?.committer?.date}));

    return (
        <Commits error={error as string | null | undefined}
                 data={data} isLoading={isLoading}/>
    );
};


export default CommitsContainer;
