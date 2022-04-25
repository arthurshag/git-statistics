import React, {FC} from 'react';
import Title from "../../../utils/Title/Title";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";
import CalendarChart, {getDataChart} from "../Charts/CalendarChart/CalendarChart";
import {GraphIcon} from "@primer/octicons-react";
import IconWrapper from "../../../utils/IconWrapper/IconWrapper";

interface IProps {
    data: { created_at: string | null | undefined }[] | undefined,
    error?: string | null,
    isLoading: boolean,
}


const Commits: FC<IProps> = ({data, error, isLoading}) => {
    const dataChart = data ? getDataChart(data) : [];
    return (
        <>
            <Title level={3}><IconWrapper Icon={GraphIcon}/> Commits for the last year</Title>
            <Loading isLoading={isLoading}>
                <ErrorGate error={error as string | null | undefined}>
                    <CalendarChart dataChart={dataChart}
                                   legend={[{type: "date", id: "Date"}, {type: "number", id: "commits"},]}/>
                </ErrorGate>
            </Loading>
        </>
    );
};


export default Commits;
