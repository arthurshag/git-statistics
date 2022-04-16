import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import classes from "../../Repository.module.scss";
import Title from "../../../utils/Title/Title";
import CalendarChart, {getDataChart} from "./CalendarChart";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";

interface IProps {
    owner: string,
    repo: string
}

const Events: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetEventsQuery({owner: owner, repo: repo});

    const dataChart = data ? getDataChart(data) : [];

    return (
        <Loading isLoading={isLoading} className={classes.chart}>
            <Title level={3}>Events:</Title>
            <ErrorGate error={error as string | undefined | null}>
                <CalendarChart dataChart={dataChart}
                               legend={[{type: "date", id: "Date"}, {type: "number", id: "events"}]}/>
            </ErrorGate>
        </Loading>
    );
};


export default Events;
