import React, {FC} from "react";
import {Chart} from "react-google-charts";

interface IProps {
    dataChart: {} | any[] | undefined
}

const ColumnDateChart: FC<IProps> = ({dataChart}) => {
    return <>
        <p><span style={{color: "red"}}>Red </span> {">= 48 hours "}
            <span style={{
                color: "yellow",
                textShadow: "1px 0px 1px black, 0px 1px 1px black,-1px 0px 1px black,0px -1px 1px black"
            }}>Yellow</span>{" >=24 hours "}
            <span style={{color: "green"}}>Green</span>{" <24 hours "}</p>
        <Chart chartType={"ColumnChart"} data={dataChart}/>
    </>
}

export default ColumnDateChart;
