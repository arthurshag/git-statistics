import React, {FC} from 'react';
import {useGetClosedPullsQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../utils/Title/Title";
import {Chart} from "react-google-charts";
import {Endpoints} from "@octokit/types";

interface IProps {
    owner: string,
    repo: string
}


const Pulls: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetClosedPullsQuery({owner: owner, repo: repo});
    if (isLoading)
        return <div>Loading...</div>
    if (!data)
        return null;

    const dataChart = getDataChart(data);

    return (
        <div>
            <Title level={3}>Last 100 Closed Pulls</Title>
            <p>Time in hours spent on closing pulls requests</p>
            <p><span style={{color: "red"}}>Red </span> {">= 48 hours "}
                <span style={{
                    color: "yellow",
                    textShadow: "1px 0px 1px black, 0px 1px 1px black,-1px 0px 1px black,0px -1px 1px black"
                }}>Yellow</span>{" >=24 hours "}
                <span style={{color: "green"}}>Green</span>{" <24 hours "}</p>
            <Chart chartType={"ColumnChart"} data={dataChart}/>
        </div>
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
