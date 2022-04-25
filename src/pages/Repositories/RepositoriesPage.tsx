import React, {FC, useCallback, useEffect} from 'react';
import {useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/Repositories/ReposSearchFilters/ReposFilters";
import Repositories from "../../components/Repositories/Repositories";
import Pagination from "../../components/utils/Pagination/Pagination";
import {useLazyGetRepositoriesQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {transformToRequestReposParams} from "../../helpers/TransformToRequestReposParams";
import Loading from "../../components/utils/Loading/Loading";
import ErrorGate from "../../components/utils/ErrorGate/ErrorGate";
import BlockShadow from "../../components/utils/BlockShadow/BlockShadow";
import Title from "../../components/utils/Title/Title";
import IconWrapper from "../../components/utils/IconWrapper/IconWrapper";
import {RepoIcon} from "@primer/octicons-react";


const RepositoriesPage: FC = () => {
    const {newParams, currentParams, setParams, saveParamsInUrl, reset} = useReposFilterParams();
    const [trigger, result] = useLazyGetRepositoriesQuery();
    const {data, isLoading, error, isFetching} = result;
    const deps = [...Object.values(currentParams)];

    useEffect(() => {
        const params = transformToRequestReposParams(currentParams);
        if (params.q.length > 0)
            trigger(params);
    }, deps)


    const fetchReposOnFiltersClick = () => {
        if (isFetching)
            return;
        const params = {...newParams, page: "1"};
        saveParamsInUrl(params);
    }

    const paginateHandler = useCallback((value: number) => {
        const params = {...newParams, page: String(value)};
        saveParamsInUrl(params);
    }, deps);

    return (
        <BlockShadow>
            <Title level={2}><IconWrapper Icon={RepoIcon}/> Repositories</Title>
            <ReposFilters params={newParams} setParams={setParams} reset={reset} onSubmit={fetchReposOnFiltersClick}
                          isFetching={isFetching}/>
            <Loading isLoading={isLoading} style={{margin: "0 auto"}}>
                <ErrorGate error={error as string | undefined | null}>
                    <Repositories repositories={data?.items || []}/>
                    <Pagination current={+newParams.page} pageHandler={paginateHandler} disabled={isFetching}
                                count={calcCountPages(data?.total_count || 0, +newParams.filesPerPage, 1000)}/>
                    {/* todo у github ограничение на поиск 1000 элементами*/}
                </ErrorGate>
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



