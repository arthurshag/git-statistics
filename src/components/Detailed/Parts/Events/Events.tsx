import React, {FC} from 'react';

import {Chart} from "react-google-charts";
import {IEvents} from "../../../../models/IEvents";
import Title from "../../../utils/Title/Title";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";
import Loading from "../../../utils/Loading/Loading";
import {PinIcon} from "@primer/octicons-react";
import IconWrapper from "../../../utils/IconWrapper/IconWrapper";

interface IProps {
    data: IEvents | undefined,
    error?: string | null,
    isLoading: boolean,
}

const options = {
    allowHtml: true,
    showRowNumber: false,
};

const formatters = [
    {
        type: "BarFormat" as const,
        column: 1,
    },
];

const Events: FC<IProps> = ({data, isLoading, error}) => {
    const separate = data && Object.entries(getData(data));
    return (
        <div>
            <Title level={3}><IconWrapper Icon={PinIcon}/> Last 500 Events:</Title>
            <Loading isLoading={isLoading}>
                <ErrorGate error={error as string | undefined | null}>
                    <Chart
                        chartType="Table"
                        width="100%"
                        data={separate && [["Type", "Count"], ...separate]}
                        options={options}
                        formatters={formatters}
                    />
                </ErrorGate>
            </Loading>
        </div>
    );
};

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
