import React, {FC, useCallback, useMemo} from 'react';
import {useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import Repositories from "../../components/Repositories/Repositories";
import Pagination from "../../components/utils/Pagination/Pagination";
import {useGetRepositoriesQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {transformToRequestReposParams} from "../../helpers/TransformToRequestReposParams";
import Loading from "../../components/utils/Loading/Loading";
import ErrorWrapper from "../../components/utils/ErrorWrapper/ErrorWrapper";
import BlockShadow from "../../components/utils/BlockShadow/BlockShadow";


const RepositoriesPage: FC = () => {
    const {newParams, currentParams, setParams, saveParamsInUrl, reset} = useReposFilterParams();

    const fetchReposOnClick = () => {
        setParams("page", "1");
        saveParamsInUrl({...newParams, page: "1"});
    }

    const paginateHandler = useCallback((value: number) => {
        const page = String(value);
        setParams("page", page);
        saveParamsInUrl({...currentParams, page});
    }, [currentParams]);

    //todo: validation must have q
    const memoizedTransformToRequestReposParams = useMemo(() => transformToRequestReposParams(currentParams),
        [currentParams]);
    const {data, isLoading, error, isFetching} = useGetRepositoriesQuery(memoizedTransformToRequestReposParams);
    return (
        <BlockShadow>
            <ReposFilters params={newParams} setParams={setParams} reset={reset} onSubmit={fetchReposOnClick}/>
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



