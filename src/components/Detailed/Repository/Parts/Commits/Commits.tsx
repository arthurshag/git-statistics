import React, {FC} from 'react';
import {useGetAllCommitsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Commits from "../../../Parts/Commits/Commits";


interface IProps {
    owner: string,
    repo: string
}

// если эти 3 строки внутри commits, то начинается бесконечный ререндер компоненты и запросы на коммиты
const todayYearAgo = new Date();
todayYearAgo.setFullYear(todayYearAgo.getFullYear() - 1);
const dateIsoString = todayYearAgo.toISOString();

const CommitsContainer: FC<IProps> = ({owner, repo}) => {
    const {data: serverData, error, isLoading} = useGetAllCommitsQuery({
        owner: owner,
        repo: repo,
        since: dateIsoString
    });
    const data = serverData?.map(({commit}) => ({created_at: commit?.committer?.date}));

    return (
        <Commits error={error as string | null | undefined}
                 data={data} isLoading={isLoading}/>
    );
};


export default CommitsContainer;
