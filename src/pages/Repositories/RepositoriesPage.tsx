import React, {FC} from 'react';
import {ReposUrlParamsType, useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import {useGetRepositoriesQuery} from "../../redux/reducers/RepositoriesReducer/RepositoryRTK";
import Repositories from "../../components/Repositories/Repositories";
import {ParamsSearchReposType} from "../../models/IRepository";
import Paginator from "../../components/Repositories/Paginator";

const RepositoriesPage: FC = () => {
    const {params, setParams, saveUrlParams, reset} = useReposFilterParams();

    const fetchReposOnClick = () => {
        saveUrlParams();
    }

    const resetHandler = () => {
        reset();
    };

    const paginateHandler = (value: number) => {
        setParams("page", value.toString());
        saveUrlParams();
    }

    const {data, isLoading, error} = useGetRepositoriesQuery(transformToRequestParams(params));

    return (
        <>
            <ReposFilters params={params} setParams={setParams} reset={resetHandler} onSubmit={fetchReposOnClick}/>
            {data && <Repositories repositories={data.items}/>}
            <Paginator current={+params.page} handler={paginateHandler}
                       count={Math.ceil((data?.total_count || 0) / 10)}/>
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
