import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Repository from "../../components/Detailed/Repository/Repository";
import ErrorGate from "../../components/utils/ErrorGate/ErrorGate";
import Loading from "../../components/utils/Loading/Loading";
import {useGetRepositoryQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";


const RepositoryDetailed: FC = (props) => {
    const params = useParams();
    const {data, error, isLoading} = useGetRepositoryQuery({owner: params.user || "", repo: params.repo || ""});

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
