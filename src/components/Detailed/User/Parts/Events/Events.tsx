import React, {FC} from 'react';
import {useGetEventsQuery} from "../../../../../redux/reducers/UserReducer/UserRTK";
import Events from "../../../Parts/Events/Events";

interface IProps {
    username: string,
    className?:string
}

const EventsUser: FC<IProps> = ({username, className}) => {
    const {data, error, isLoading} = useGetEventsQuery({username});
    return (
        <Events data={data} isLoading={isLoading} error={error as string | null | undefined} className={className}/>
    );
};


export default EventsUser;
