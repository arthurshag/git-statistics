import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Chart} from "react-google-charts";
import Title from "../../utils/Title/Title";
import Loading from "../../utils/Loading/Loading";
import Error from "../../utils/ErrorWrapper/ErrorWrapper";

interface IProps {
    owner: string,
    repo: string
}

const Languages: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});

    const chartData = data ? [["Language", "strokes"], ...Object.keys(data).map((language) => {
        return [language, data[language]]
    })] : undefined;

    return (
        <Loading isLoading={isLoading}>
            <div>
                <Title level={3}>Languages</Title>
                <Error error={error as string | null | undefined}>
                    <Chart
                        chartType="PieChart"
                        width={"400px"}
                        height="200px"
                        data={chartData}
                    />
                </Error>
            </div>
        </Loading>
    );
};


export default Languages;
