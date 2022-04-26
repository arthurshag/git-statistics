import React, {FC} from "react";
import {Chart} from "react-google-charts";
import classes from "./AreaChart.module.scss";

interface IProps {
    legend: [string, string, object]  | [string, string]
    dataChart: Array<[string, number, string]> | Array<[string, number]>
}

const ColumnDateChart: FC<IProps> = ({legend, dataChart}) => {
    return <>
        <p>
            <span className={classes.red}>Red </span> {">= 48 hours "}
            <span className={classes.yellow}>Yellow</span>{" >=24 hours "}
            <span className={classes.green}>Green</span>{" <24 hours "}
        </p>
        <p>You can also change the scale of the chart using the mouse wheel. Right click reset chart</p>
        <Chart chartType={"AreaChart"} data={[legend, ...dataChart]}
               options={{explorer: {keepInBounds: true}, vAxis: {minValue: 0}}}/>
    </>
}

export const getDataChart = (data: { closed_at: string | null, created_at: string, title: string }[]) => {
    const dataChart: [string, number, string][] = [];
    data.forEach((c) => {
        if (!c.closed_at)
            return;
        const hoursInMs = 1000 * 60 * 60;
        const dateDiff = Math.round((new Date(c.closed_at).valueOf() - new Date(c.created_at).valueOf()) / hoursInMs);
        dataChart.push([c.title, dateDiff, dateDiff < 24 ? "green" : dateDiff < 48 ? "yellow" : "red"]);
    })

    return dataChart;
}


export default ColumnDateChart;
