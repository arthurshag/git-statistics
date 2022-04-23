import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../../../redux/reducers/UserReducer/UserRTK";
import Events from "../../../Parts/Events/Events";

interface IProps {
    username: string,
}

const EventsUser: FC<IProps> = ({username}) => {
    const {data, error, isLoading} = useGetEventsQuery({username});
    return (
        <Events data={data} isLoading={isLoading} error={error as string | null | undefined}/>
    );
};


export default EventsUser;
