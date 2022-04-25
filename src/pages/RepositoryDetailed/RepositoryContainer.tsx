import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Repository from "../../components/Detailed/Repository/Repository";
import ErrorGate from "../../components/utils/ErrorGate/ErrorGate";
import Loading from "../../components/utils/Loading/Loading";
import {useGetRepositoryQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import classes from "./RepositoryDetailed.module.scss";

const RepositoryDetailed: FC = () => {
    const params = useParams();
    const {data, error, isLoading} = useGetRepositoryQuery({owner: params.user || "", repo: params.repo || ""});

    return (
        <Loading isLoading={isLoading} className={classes.loading}>
            <ErrorGate error={error as string | null | undefined}>
                {data && <Repository repository={data}/>}
            </ErrorGate>
        </Loading>);
};


export default RepositoryDetailed;
