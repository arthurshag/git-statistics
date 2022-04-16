import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Chart} from "react-google-charts";
import Title from "../../utils/Title/Title";
import Loading from "../../utils/Loading/Loading";
import ErrorGate from "../../utils/ErrorGate/ErrorGate";

interface IProps {
    owner: string,
    repo: string
}

const Languages: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});
    const chartData = data && [["Language", "strokes"], ...Object.entries(data)];

    return (
        <Loading isLoading={isLoading}>
            <div>
                <Title level={3}>Languages</Title>
                <ErrorGate error={error as string | null | undefined}>
                    {chartData ? <Chart
                        chartType="PieChart"
                        width={"400px"}
                        height="200px"
                        data={chartData}
                    /> : "No data"}
                </ErrorGate>
            </div>
        </Loading>
    );
};


export default Languages;
