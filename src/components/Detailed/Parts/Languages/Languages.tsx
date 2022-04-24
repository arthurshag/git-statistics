import React, {FC} from 'react';
import Title from "../../../utils/Title/Title";
import {Chart} from "react-google-charts";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";
import {ILanguage} from "../../../../models/ILanguage";
import Loading from "../../../utils/Loading/Loading";
import {VersionsIcon} from "@primer/octicons-react";
import IconWrapper from "../../../utils/IconWrapper/IconWrapper";

interface IProps {
    data: ILanguage | undefined,
    error: string | null | undefined,
    isLoading: boolean,
    label?: string,
}

const Languages: FC<IProps> = ({data, error, isLoading, label}) => {
    const chartData = data && [["Language", "strokes"], ...Object.entries(data)];
    return (
        //todo: говно либа ломается, если здесь ставить loading, почему и как это происходит не понимаю
        <Loading isLoading={false}>
            <div>
                <Title level={3}><IconWrapper Icon={VersionsIcon}/> Languages</Title>
                <p>{label}</p>
                <ErrorGate error={error as string | null | undefined}>
                    <Chart
                        chartType="PieChart"
                        width={"400px"}
                        height="200px"
                        data={chartData}
                    />
                </ErrorGate>
            </div>
        </Loading>
    );
};


export default Languages;
