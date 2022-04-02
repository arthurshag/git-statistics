import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Repository from "./Repository";
import {useGetRepositoryQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";

const RepositoryDetailed: FC = (props) => {
    const params = useParams();
    const {data, error, isLoading} = useGetRepositoryQuery({owner: params.owner || "", repo: params.repo || ""});
    if (!data) {
        return <div>
            {params.owner}
            {params.repo}
        </div>
    }

    return (<Repository repository={data}/>);
};


export default RepositoryDetailed;
