import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";

interface IProps {
    owner: string,
    repo: string
}

const Events:FC<IProps> = ({owner, repo }) => {
    const {data, error, isLoading} = useGetEventsQuery({owner: owner, repo: repo});

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};


export default Events;
