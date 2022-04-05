import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Repository from "./Repository";
import {useGetRepositoryQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import LoadingError from "./RepositoryParts/LoadingError";

const RepositoryDetailed: FC = (props) => {
    const params = useParams();
    const {data, error, isLoading} = useGetRepositoryQuery({owner: params.owner || "", repo: params.repo || ""});

    return (
        <LoadingError isLoading={isLoading} error={error as string | null | undefined} style={{alignSelf: "stretch"}}>
            {data && <Repository repository={data}/>}
        </LoadingError>);
};


export default RepositoryDetailed;
