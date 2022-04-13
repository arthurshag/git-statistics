import React, {FC} from 'react';
import {useGetAllCommitsQuery,} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Endpoints} from "@octokit/types";
import Title from "../../../utils/Title/Title";
import CalendarChart from "./CalendarChart";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";

interface IProps {
    owner: string,
    repo: string
}


const Commits: FC<IProps> = ({owner, repo}) => {
    const thisYear = new Date(new Date().getFullYear(), 0, 1);
    const {data, error, isLoading} = useGetAllCommitsQuery({owner: owner, repo: repo, since: thisYear.toISOString()});

    const dataChart = data ? getDataChart(data) : [];
    return (
        <Loading isLoading={isLoading}>
            <Title level={3}>Commits in this Year</Title>
            <ErrorGate error={error as string | null | undefined}>
                <CalendarChart dataChart={dataChart}/>
            </ErrorGate>
        </Loading>
    );
};


const getDataChart = (data: Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"]) => {
    const options: [Date, number][] = [];
    const now = new Date();
    data.forEach(({commit}) => {
        const {committer} = commit;
        const created_at = committer?.date;
        if (!created_at) {
            return;
        }
        const date = new Date(created_at);
        if (date.getFullYear() !== now.getFullYear())
            return;
        date.setHours(0, 0, 0, 0);
        const index = options.findIndex((e) => {
            return +e[0] === +date;
        });
        if (index >= 0) {
            options[index][1]++;
        } else {
            options.push([date, 1]);
        }
    });
    return [[
        {type: "date", id: "Date"},
        {type: "number", id: "commits"},
    ], ...options];
}


export default Commits;
