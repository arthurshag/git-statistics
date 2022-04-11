import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Endpoints} from "@octokit/types";
import LoadingError from "../LoadingError";
import classes from "../../Repository.module.scss";
import Title from "../../../utils/Title/Title";
import CalendarChart from "./CalendarChart";

interface IProps {
    owner: string,
    repo: string
}

const Events: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetEventsQuery({owner: owner, repo: repo});

    const dataChart = data ? gatDataChart(data) : [];

    return (
        <LoadingError isLoading={isLoading} error={error as string | undefined | null} className={classes.chart}>
            <Title level={3}>Events:</Title>
            <CalendarChart dataChart={dataChart}/>
        </LoadingError>
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
