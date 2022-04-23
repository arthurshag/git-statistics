import React, {FC} from 'react';
import {useGetClosedIssuesQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../../utils/Title/Title";
import ColumnChart, {getDataChart} from "../../../Parts/Charts/ColumnChart/ColumnChart";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";

interface IProps {
    owner: string,
    repo: string
}


const Issues: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetClosedIssuesQuery({owner: owner, repo: repo});
    const dataChart = data && getDataChart(data);

    return (
        <Loading isLoading={isLoading}>
            <div>
                <Title level={3}>Last 100 Closed Issues</Title>
                <p>Time in hours spent on closing issues requests</p>
                <ErrorGate error={error as string | null | undefined}>
                    {dataChart && dataChart.length > 0 ?
                        <ColumnChart dataChart={dataChart} legend={["Element", "Hours", {role: 'style'}]}/>
                        : "No data"}
                </ErrorGate>
            </div>
        </Loading>
    );
};


export default Issues;
