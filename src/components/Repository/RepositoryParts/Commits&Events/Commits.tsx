import React, {FC} from 'react';
import {useGetAllCommitsQuery,} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../utils/Title/Title";
import CalendarChart, {getDataChart} from "./CalendarChart";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";

interface IProps {
    owner: string,
    repo: string
}

// если эти 3 строки внутри commits, то начинается бесконечный ререндер компоненты и запросы на коммиты
const todayYearAgo = new Date();
todayYearAgo.setFullYear(todayYearAgo.getFullYear() - 1);
const dateIsoString = todayYearAgo.toISOString();

const Commits: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetAllCommitsQuery({owner: owner, repo: repo, since: dateIsoString});
    const dataChart = data ? getDataChart(data.map(({commit}) => ({created_at: commit?.committer?.date}))) : [];
    return (
        <Loading isLoading={isLoading}>
            <Title level={3}>Commits for the last year</Title>
            <ErrorGate error={error as string | null | undefined}>
                <CalendarChart dataChart={dataChart}
                               legend={[{type: "date", id: "Date"}, {type: "number", id: "commits"},]}/>
            </ErrorGate>
        </Loading>
    );
};


export default Commits;
