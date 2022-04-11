import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Chart} from "react-google-charts";
import Title from "../../utils/Title/Title";

interface IProps {
    owner: string,
    repo: string
}

const Languages: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});
    if (isLoading)
        return <div>Loading...</div>
    if (!data)
        return null;
    const chartData = [["Language", "strokes"], ...Object.keys(data).map((language) => {
        return [language, data[language]]
    })];

    return (
        <div>
            <Title level={3}>Languages</Title>
            <Chart
                chartType="PieChart"
                width={"400px"}
                height="200px"
                data={chartData}
            />
        </div>
    );
};


export default Languages;
