import React, {FC, useCallback, useEffect} from 'react';
import {ReposUrlParamsType, useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import Repositories from "../../components/Repositories/Repositories";
import Pagination from "../../components/utils/Pagination/Pagination";
import {useLazyGetRepositoriesQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {transformToRequestReposParams} from "../../helpers/TransformToRequestReposParams";
import Loading from "../../components/utils/Loading/Loading";
import ErrorWrapper from "../../components/utils/ErrorWrapper/ErrorWrapper";
import BlockShadow from "../../components/utils/BlockShadow/BlockShadow";


const RepositoriesPage: FC = () => {
    let {newParams, currentParams, setParams, saveParamsInUrl, reset} = useReposFilterParams();
    const [trigger, result] = useLazyGetRepositoriesQuery();
    const {data, isLoading, error} = result;
    useEffect(() => {
        const params = transformToRequestReposParams(currentParams);
        if (params.q.length > 0)
            trigger(params);
    }, [])

    const fetchRepos = (params: ReposUrlParamsType) => {
        const requestReposParams = transformToRequestReposParams(params);
        if (requestReposParams.q.length === 0)
            return;
        setParams("page", params.page);
        saveParamsInUrl(params);
        trigger(requestReposParams);
    }

    const fetchReposOnFiltersClick = () => {
        const params = {...newParams, page: "1"};
        fetchRepos(params);
    }

    const paginateHandler = useCallback((value: number) => {
        const params = {...newParams, page: String(value)};
        fetchRepos(params);
    }, [currentParams]);


    return (
        <BlockShadow>
            <ReposFilters params={newParams} setParams={setParams} reset={reset} onSubmit={fetchReposOnFiltersClick}/>
            <Loading isLoading={isLoading} style={{margin: "0 auto"}}>
                <ErrorWrapper error={error as string | undefined | null}>
                    <Repositories repositories={data?.items || []}/>
                    <Pagination current={+newParams.page} pageHandler={paginateHandler}
                                count={calcCountPages(data?.total_count || 0, +newParams.filesPerPage, 1000)}/>
                    {/* todo у github ограничение на поиск 1000 элементами*/}
                </ErrorWrapper>
            </Loading>
        </BlockShadow>
    );
};

function calcCountPages(countsElements: number, perPage: number, maximumElements?: number) {
    const countPages = Math.ceil(countsElements / perPage);
    if (maximumElements) {
        return Math.min(countPages, Math.ceil(maximumElements / perPage))
    }

    return countPages;
}

export default RepositoriesPage;



