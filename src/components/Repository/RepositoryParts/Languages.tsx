import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Chart} from "react-google-charts";
import {Simulate} from "react-dom/test-utils";

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
            <Chart
                chartType="PieChart"
                width={"500px"}
                height="200px"
                data={chartData}
                options={{title: "Languages"}}
            />
        </div>
    );
};


export default Languages;
