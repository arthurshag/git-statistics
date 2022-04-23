import React, {FC} from 'react';
import Title from "../../../../utils/Title/Title";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import {useGetEventsQuery} from "../../../../../redux/reducers/UserReducer/UserRTK";
import {IEvents} from "../../../../../models/IEvents";
import {Chart} from "react-google-charts";

interface IProps {
    username: string,
}

const Events: FC<IProps> = ({username}) => {
    const {data, error, isLoading} = useGetEventsQuery({username});
    const separate = data && Object.entries(getData(data));
    const ui = separate?.map(([key, value]) => {
        return <div>{key}: {value}</div>
    })
    return (
        <div>
            <Title level={3}>Last 500 Events:</Title>
            <Loading isLoading={isLoading}>
                <ErrorGate error={error as string | undefined | null}>
                    <Chart
                        chartType="Table"
                        width="100%"
                        height="400px"
                        data={separate && [["Department", "Revenues Change"], ...separate]}
                        options={options}
                        formatters={formatters}
                    />
                </ErrorGate>
            </Loading>
        </div>
    );
};

export const options = {
    allowHtml: true,
    showRowNumber: false,
};

export const formatters = [
    {
        type: "BarFormat" as const,
        column: 1,
        options: {
            width: 120,
        },
    },
];


const getData = (data: IEvents) => {
    return data.reduce((obj, current) => {
        const type = current.type;
        if (!type)
            return obj;
        if (obj[type]) {
            obj[type]++;
        } else {
            obj[type] = 1;
        }
        return obj;
    }, {} as { [key: string]: number })
}


export default Events;
