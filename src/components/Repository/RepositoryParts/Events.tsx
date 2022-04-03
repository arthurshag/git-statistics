import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis, ScatterChart, ZAxis} from "recharts";
import {Endpoints} from "@octokit/types";

interface IProps {
    owner: string,
    repo: string
}

const Events: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetEventsQuery({owner: owner, repo: repo});
    if (!data)
        return null;
    const options = getOptions(data);
    return (
        <div>
            Events:
            <div>
                {options}
            </div>
        </div>
    );
};

const getOptions = (data: Endpoints["GET /repos/{owner}/{repo}/events"]["response"]["data"]) => {
    let options: { date: Date, value: number }[] = [];
    data.forEach(({created_at}) => {
        if (created_at) {
            const date = new Date(created_at);
            date.setHours(0, 0, 0, 0);
            const index = options.findIndex((e) => {
                return +e.date === +date;
            });
            if (index >= 0) {
                options[index].value++;
            } else {
                options.push({date: date, value: 1});
            }
        }
    })
    return options;
}

export default Events;
