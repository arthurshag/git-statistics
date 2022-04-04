import React, {FC} from 'react';
import {ReposUrlParamsType, useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import {useGetRepositoriesQuery} from "../../redux/reducers/RepositoriesReducer/RepositoryRTK";
import Repositories from "../../components/Repositories/Repositories";
import {ParamsSearchReposType} from "../../models/IRepository";
import Paginator from "../../components/Repositories/Paginator";

const RepositoriesPage: FC = () => {
    const {newParams, currentParams, setParams, saveParamsInUrl, reset} = useReposFilterParams();

    const fetchReposOnClick = () => {
        saveParamsInUrl({...newParams, page: 1});
    }

    const resetHandler = () => {
        reset();
    };

    const paginateHandler = (value: number) => {
        saveParamsInUrl({...currentParams, page: value});
    };

    const {data, isLoading, error} = useGetRepositoriesQuery(transformToRequestParams(currentParams));

    return (
        <>
            <ReposFilters params={newParams} setParams={setParams} reset={resetHandler} onSubmit={fetchReposOnClick}/>
            {error ? error : isLoading ? "Loading..." : data && <><Repositories repositories={data.items}/>
                <Paginator current={+newParams.page} handler={paginateHandler}
                           count={Math.ceil((data?.total_count || 0) / 10)}/></>}
        </>
    );
};


export default RepositoriesPage;


const transformToRequestParams = (params: ReposUrlParamsType): ParamsSearchReposType => {
    return {
        q: `user:${params.username} type:${params.type}`,
        page: +(params.page || 1),
        per_page: 10,
        sort: params.sort || undefined
    }
}
