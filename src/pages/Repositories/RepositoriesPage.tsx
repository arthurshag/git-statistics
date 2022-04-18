import React, {FC} from 'react';
import {ReposUrlParamsType, useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import Repositories from "../../components/Repositories/Repositories";
import {ParamsSearchReposType} from "../../models/IRepository";
import Paginator from "../../components/Repositories/Paginator";
import {useGetRepositoriesQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";

const RepositoriesPage: FC = () => {
    const {newParams, currentParams, setParams, saveParamsInUrl, reset} = useReposFilterParams();

    const fetchReposOnClick = () => {
        setParams("page", 1);
        saveParamsInUrl({...newParams, page: 1});
    }

    const resetHandler = () => {
        reset();
    };

    const paginateHandler = (value: number) => {
        setParams("page", value);
        saveParamsInUrl({...currentParams, page: value});
    };

    const {data, isLoading, error, isFetching} = useGetRepositoriesQuery(transformToRequestParams(currentParams));
    return (
        <>
            <ReposFilters params={newParams} setParams={setParams} reset={resetHandler} onSubmit={fetchReposOnClick}/>
            {error ? error : isFetching ? "ErrorGate..." : data && <><Repositories repositories={data.items}/>
                <Paginator current={+newParams.page} handler={paginateHandler}
                           count={Math.ceil((data?.total_count || 0) / 10)}/></>}
        </>
    );
};


export default RepositoriesPage;


const transformToRequestParams = (params: ReposUrlParamsType): ParamsSearchReposType => {
    return {
        q: `user:${params.username}`,
        page: +(params.page || 1),
        per_page: 10,
        sort: params.sort || undefined
    }
}
