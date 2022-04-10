import React, {FC, useCallback, useMemo} from 'react';
import {useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import Repositories from "../../components/Repositories/Repositories";
import Pagination from "../../components/Repositories/Pagination";
import {useGetRepositoriesQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {transformToRequestReposParams} from "../../helpers/TransformToRequestReposParams";


const RepositoriesPage: FC = () => {
    const {newParams, currentParams, setParams, saveParamsInUrl, reset} = useReposFilterParams();

    const fetchReposOnClick = () => {
        setParams("page", "1");
        saveParamsInUrl({...newParams, page: "1"});
    }

    const resetHandler = () => {
        reset();
    };

    const paginateHandler = useCallback((value: number) => {
        const page = String(value);
        setParams("page", page);
        saveParamsInUrl({...currentParams, page});
    }, []);

    //todo: validation must have q

    const memoizedTransformToRequestReposParams = useMemo(() => transformToRequestReposParams(currentParams),
        [currentParams]);
    const {data, isLoading, error, isFetching} = useGetRepositoriesQuery(memoizedTransformToRequestReposParams);
    return (
        <>
            <ReposFilters params={newParams} setParams={setParams} reset={resetHandler} onSubmit={fetchReposOnClick}/>
            {error ? error : isFetching ? "Loading..." : data && <><Repositories repositories={data.items}/>
                <Pagination current={+newParams.page} pageHandler={paginateHandler}
                            count={calcCountPages(data.total_count, +newParams.filesPerPage, 1000)}/></>}
            {/* todo у github ограничение на поиск 1000 элементами*/}
        </>
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



