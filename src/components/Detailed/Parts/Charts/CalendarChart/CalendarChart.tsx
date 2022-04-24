import {Chart} from "react-google-charts";
import React, {FC} from "react";
import classes from "./CalendarChart.module.scss";

export type Legend<T> = { type: T, id: string }

interface IProps {
    dataChart: [Date, number][],
    legend: [Legend<'date'>, Legend<'number'>]
}

const CalendarChart: FC<IProps> = ({dataChart, legend}) => {
    return <div className={classes.chart}>
        <Chart
            chartType="Calendar"
            data={[legend, ...dataChart]}
            height={300}
            options={{
                calendar: {cellSize: 14},
                colorAxis: {minValue: 0, colors: ['#f6ffe5', '#ff0000']},
            }}
            width="800px"
        />
    </div>;
};

export const getDataChart = (data: { created_at: string | null | undefined }[]): [Date, number][] => {
    const dataChart: { [key: string]: number } = {};
    data.forEach(({created_at}) => {
        if (!created_at) {
            return;
        }

        const date = new Date(created_at);
        date.setHours(0, 0, 0, 0);
        const dateString = date.toISOString();

        const value = dataChart[dateString];
        if (value) {
            dataChart[dateString] = value + 1;
        } else {
            dataChart[dateString] = 1;
        }
    });

    return Object.entries(dataChart).map(([date, value]) => [new Date(date), value]);
};

export default CalendarChart;
