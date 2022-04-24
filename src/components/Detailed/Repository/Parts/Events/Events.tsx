import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Events from "../../../Parts/Events/Events";


interface IProps {
    owner: string,
    repo: string,
    className?: string
}

const EventsRepo: FC<IProps> = ({owner, repo, className}) => {
    const {data, error, isLoading} = useGetEventsQuery({owner: owner, repo: repo});
    return (<Events data={data} error={error as null | string | undefined} isLoading={isLoading}/>
    );
};

export default EventsRepo;
