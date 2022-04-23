import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Repository from "./Repository";
import {useGetRepositoryQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Loading from "../utils/Loading/Loading";
import ErrorGate from "../utils/ErrorGate/ErrorGate";

const RepositoryDetailed: FC = (props) => {
    const params = useParams();
    const {data, error, isLoading} = useGetRepositoryQuery({owner: params.owner || "", repo: params.repo || ""});

    //todo: remove style
    return (
        <Loading isLoading={isLoading} style={{alignSelf: "center"}}>
            <ErrorGate error={error as string | null | undefined}>
                <div style={{alignSelf: "stretch"}}>
                    {data && <Repository repository={data}/>}
                </div>
            </ErrorGate>
        </Loading>);
};


export default RepositoryDetailed;
