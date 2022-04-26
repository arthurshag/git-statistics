import React, {FC} from 'react';
import {PeopleIcon} from "@primer/octicons-react";
import {ICommits} from "../../../../models/ICommits";
import Title from "../../../utils/Title/Title";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";
import ColumnChart from "../Charts/ColumnChart/ColumnChart";
import IconWrapper from "../../../utils/IconWrapper/IconWrapper";

interface IProps {
    data: ICommits | undefined,
    error?: string | null
    isLoading: boolean
}

const CommitsSortedByPeople: FC<IProps> = ({data, error, isLoading}) => {
    const chartData = data?.reduce((filtered, current) => {
        if (!current.author)
            return filtered;
        if (filtered[current.author.login]) {
            filtered[current.author.login]++;
        } else {
            filtered[current.author.login] = 1;
        }
        return filtered;
    }, {} as { [key: string]: number });

    return (
        <>
            <Title level={3}><IconWrapper Icon={PeopleIcon}/> Commits sorted by people for last year</Title>
            <Loading isLoading={isLoading}>
                <ErrorGate error={error as string | null | undefined}>
                    {chartData && <>
                        <p>You can also change the scale of the chart using the mouse wheel. Right click reset chart</p>
                        <ColumnChart legend={["User", "Commits"]} dataChart={Object.entries(chartData)}
                        />
                    </>}
                </ErrorGate>
            </Loading>
        </>
    );
};


export default CommitsSortedByPeople;
