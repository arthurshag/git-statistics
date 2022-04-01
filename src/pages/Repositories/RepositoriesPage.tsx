import React, {FC, useEffect, useRef} from 'react';
import {useAppDispatch} from "../../redux/hooks/reduxHooks";
import {fetchMoreRepos} from "../../redux/reducers/RepositoriesReducer/ActionCreators";
import RepositoriesPaginate from "../../components/Repositories/RepositoriesContainer";
import {useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";

const RepositoriesPage: FC = () => {
    const {params, setParams, saveUrlParams, reset} = useReposFilterParams();
    const page = useRef(1);
    const dispatch = useAppDispatch();
    const fetchReposPaginateOnClick = () => {
        page.current = page.current + 1;
        saveUrlParams();
        dispatch(fetchMoreRepos({...params, page: page.current}));
    };

    const fetchReposOnClick = () => {
        page.current = 1;
        saveUrlParams();
        dispatch(fetchMoreRepos({...params, page: page.current}));
    }

    const resetHandler = () => {
        reset();
    };

    return (
        <>
            <ReposFilters params={params} setParams={setParams} reset={resetHandler} onSubmit={fetchReposOnClick}/>
            <RepositoriesPaginate fetchReposPaginateOnClick={fetchReposPaginateOnClick}/>
        </>
    );
};




export default RepositoriesPage;
