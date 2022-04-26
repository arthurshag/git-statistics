import React, {FC} from "react";
import {Chart} from "react-google-charts";
import classes from "./AreaChart.module.scss";

interface IProps {
    legend: [string, string]
    dataChart: Array<[string, number]>
}

const BarChart: FC<IProps> = ({legend, dataChart}) => {
    return <>
        <Chart
            chartType="Bar"
            width="100%"
            height="400px" data={[legend, ...dataChart]}
        />
    </>
}

export default BarChart;
