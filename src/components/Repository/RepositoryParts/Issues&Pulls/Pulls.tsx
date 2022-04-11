import React, {FC} from 'react';
import {useGetClosedPullsQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../utils/Title/Title";
import {Endpoints} from "@octokit/types";
import ColumnDateChart from "./ColumnChart";
import Loading from "../../../utils/Loading/Loading";
import ErrorWrapper from "../../../utils/ErrorWrapper/ErrorWrapper";

interface IProps {
    owner: string,
    repo: string
}


const Pulls: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetClosedPullsQuery({owner: owner, repo: repo});
    const dataChart = data ? getDataChart(data) : undefined;

    return (
        <Loading isLoading={isLoading}>
            <div>
                <Title level={3}>Last 100 Closed Pulls</Title>
                <p>Time in hours spent on closing pulls requests</p>
                <ErrorWrapper error={error as string | null | undefined}>
                    <ColumnDateChart dataChart={dataChart}/>
                </ErrorWrapper>
            </div>
        </Loading>
    );
};

const getDataChart = (data: Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"]) => {
    const dataChart: [string, string | number, object | string][] = [["Element", "Hours", {role: 'style'}]];
    data.forEach((c) => {
        if (!c.closed_at)
            return;
        const dateDiff = Math.round((+new Date(c.closed_at) - +new Date(c.created_at)) / 1000 / 60 / 60);
        dataChart.push([c.title, dateDiff, dateDiff < 24 ? "green" : dateDiff < 48 ? "yellow" : "red"]);
    })

    return dataChart;
}


export default Pulls;
