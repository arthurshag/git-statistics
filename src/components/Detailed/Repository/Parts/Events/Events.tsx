import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../../utils/Title/Title";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import Loading from "../../../../utils/Loading/Loading";
import CalendarChart, {getDataChart} from "../../../Parts/Charts/CalendarChart/CalendarChart";


interface IProps {
    owner: string,
    repo: string,
    className?: string
}

const Events: FC<IProps> = ({owner, repo, className}) => {
    const {data, error, isLoading} = useGetEventsQuery({owner: owner, repo: repo});

    const dataChart = data ? getDataChart(data) : [];

    return (
        <Loading isLoading={isLoading}>
            <Title level={3}>Last 500 Events:</Title>
            <ErrorGate error={error as string | undefined | null}>
                <CalendarChart dataChart={dataChart}
                               legend={[{type: "date", id: "Date"}, {type: "number", id: "events"}]}/>
            </ErrorGate>
        </Loading>
    );
};


export default Events;
