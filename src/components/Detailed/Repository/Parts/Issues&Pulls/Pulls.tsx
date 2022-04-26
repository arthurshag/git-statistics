import React, {FC} from 'react';
import {useGetClosedPullsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../../utils/Title/Title";
import ColumnChart, {getDataChart} from "../../../Parts/Charts/AreaChart/AreaChart";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import {GitPullRequestIcon} from "@primer/octicons-react";
import IconWrapper from "../../../../utils/IconWrapper/IconWrapper";

interface IProps {
    owner: string,
    repo: string
}


const Pulls: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetClosedPullsQuery({owner: owner, repo: repo});
    const dataChart = data && getDataChart(data);

    return (
        <div>
            <Title level={3}><IconWrapper Icon={GitPullRequestIcon}/> Last 100 Closed Pulls</Title>
            <p>Time in hours spent on closing pulls requests</p>
            <Loading isLoading={isLoading}>

                <ErrorGate error={error as string | null | undefined}>
                    {dataChart && dataChart.length > 0 ?
                        <ColumnChart dataChart={dataChart} legend={["Element", "Hours", {role: 'style'}]}/>
                        : "No data"}
                </ErrorGate>
            </Loading>
        </div>
    );
};

export default Pulls;
