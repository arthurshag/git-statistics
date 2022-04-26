import React, {FC} from "react";
import {Chart} from "react-google-charts";
import classes from "./AreaChart.module.scss";

interface IProps {
    legend: [string, string]
    dataChart: Array<[string, number]>
}

const ColumnChart: FC<IProps> = ({legend, dataChart}) => {
    return <>
        {dataChart.length > 0? <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px" data={[legend, ...dataChart]}
            options={{explorer: {keepInBounds: true}}}
        /> : "No data"}
    </>
}

export default ColumnChart;
