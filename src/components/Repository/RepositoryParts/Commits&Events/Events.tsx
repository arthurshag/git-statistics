import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Endpoints} from "@octokit/types";
import classes from "../../Repository.module.scss";
import Title from "../../../utils/Title/Title";
import CalendarChart from "./CalendarChart";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";

interface IProps {
    owner: string,
    repo: string
}

const Events: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetEventsQuery({owner: owner, repo: repo});

    const dataChart = data ? gatDataChart(data) : [];

    return (
        <Loading isLoading={isLoading} className={classes.chart}>
            <Title level={3}>Events:</Title>
            <ErrorGate error={error as string | undefined | null}>
                <CalendarChart dataChart={dataChart}/>
            </ErrorGate>
        </Loading>
    );
};

const gatDataChart = (data: Endpoints["GET /repos/{owner}/{repo}/events"]["response"]["data"]) => {
    let options: [Date, number][] = [];
    const now = new Date();
    data.forEach(({created_at}) => {
        if (created_at) {
            const date = new Date(created_at);
            if (date.getFullYear() !== now.getFullYear())
                return;
            date.setHours(0, 0, 0, 0);
            const index = options.findIndex((e) => {
                return +e[0] === +date;
            });
            if (index >= 0) {
                options[index][1]++;
            } else {
                options.push([date, 1]);
            }
        }
    })
    return [[
        {type: "date", id: "Date"},
        {type: "number", id: "Won/Loss"},
    ], ...options];
}


export default Events;
