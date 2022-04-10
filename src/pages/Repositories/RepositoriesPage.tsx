import React, {FC, useCallback} from 'react';
import {useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";
import Repositories from "../../components/Repositories/Repositories";
import Pagination from "../../components/Repositories/Pagination";
import {useGetRepositoriesQuery} from "../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {transformToRequestParamsRepos} from "../../helpers/TransformToRequestParams";

const filesPerPage = 10;

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
    const wrapped = useCallback(() => transformToRequestParamsRepos(currentParams), [currentParams]);
    const {data, isLoading, error, isFetching} = useGetRepositoriesQuery(wrapped());
    return (
        <>
            <ReposFilters params={newParams} setParams={setParams} reset={resetHandler} onSubmit={fetchReposOnClick}/>
            {error ? error : isFetching ? "Loading..." : data && <><Repositories repositories={data.items}/>
                <Pagination current={+newParams.page} pageHandler={paginateHandler}
                            count={Math.ceil((data?.total_count || 0) / filesPerPage)}/></>}
        </>
    );
};


export default RepositoriesPage;



