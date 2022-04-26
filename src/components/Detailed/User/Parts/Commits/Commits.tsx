import React, {FC} from 'react';
import CommitsSortedByDate from "../../../Parts/Commits/CommitsSortedByDate";
import {useGetCommitsByAllRepos} from "../../../../../redux/reducers/UserReducer/useGetCommitsByAllRepos";


interface IProps {
    user: string
}

const CommitsContainer: FC<IProps> = ({user}) => {
    const {data: serverData, error, isLoading} = useGetCommitsByAllRepos(user);
    const data = serverData?.map(({commit}) => ({created_at: commit?.committer?.date}));

    return (
        <CommitsSortedByDate error={error as string | null | undefined}
                             data={data} isLoading={isLoading}/>
    );
};


export default CommitsContainer;
