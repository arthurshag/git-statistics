import React, {FC} from 'react';
import {ReposUrlParamsType, useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import {useGetRepositoriesQuery} from "../../redux/reducers/RepositoriesReducer/RepositoryRTK";
import Repositories from "../../components/Repositories/Repositories";
import {ParamsSearchReposType} from "../../models/IRepository";

const RepositoriesPage: FC = () => {
    const {params, setParams, saveUrlParams, reset} = useReposFilterParams();

    const fetchReposOnClick = () => {
        saveUrlParams();
    }

    const resetHandler = () => {
        reset();
    };

    const {data, isLoading, isFetching} = useGetRepositoriesQuery(transformToRequestParams(params));
    return (
        <>
            <ReposFilters params={params} setParams={setParams} reset={resetHandler} onSubmit={fetchReposOnClick}/>
            {data && <Repositories repositories={data.items}/>}
            <button onClick={() => setParams("page", "1")}>1</button>
            <button onClick={() => setParams("page", "2")}>2</button>
            <button onClick={() => setParams("page", "3")}>3</button>
        </>
    );
};


export default RepositoriesPage;


const transformToRequestParams = (params: ReposUrlParamsType): ParamsSearchReposType => {
    return {
        q: `user:${params.username}`,
        page: +(params.page || 1)
    }
}
