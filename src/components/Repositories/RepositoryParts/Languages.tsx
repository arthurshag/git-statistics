import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";

interface IProps {
    owner: string,
    repo: string
}

const Languages: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});
    if (isLoading)
        return <div>Loading...</div>
    if (!data)
        return null;

    const values = Object.keys(data).map(key => `${key} ${data[key]}`).join(", ");
    return (
        <div>
            Languages: {" "}
            {values}
        </div>
    );
};


export default Languages;
