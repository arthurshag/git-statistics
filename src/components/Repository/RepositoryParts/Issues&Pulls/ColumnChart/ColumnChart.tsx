import React, {FC} from "react";
import {Chart} from "react-google-charts";
import classes from "./ColumnChart.module.scss";

interface IProps {
    legend: [string, string, object]
    dataChart: Array<[string, number, string]>
}

const ColumnDateChart: FC<IProps> = ({legend, dataChart}) => {
    return <>
        <p>
            <span className={classes.red}>Red </span> {">= 48 hours "}
            <span className={classes.yellow}>Yellow</span>{" >=24 hours "}
            <span className={classes.green}>Green</span>{" <24 hours "}
        </p>
        <Chart chartType={"ColumnChart"} data={[legend, ...dataChart]}/>
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
