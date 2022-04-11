import {Chart} from "react-google-charts";
import React, {FC} from "react";

interface IProps {
    dataChart: {} | any[] | undefined
}

const CalendarChart: FC<IProps> = ({dataChart}) => {
    return <Chart
        chartType="Calendar"
        data={dataChart}
        height={200}
        options={{calendar: {cellSize: 14},}}
        width="100%"
    />;
}

export default CalendarChart;
