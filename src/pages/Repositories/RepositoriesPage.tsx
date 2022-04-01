import React, {FC, useRef} from 'react';
import {useAppDispatch} from "../../redux/hooks/reduxHooks";
import {fetchMoreRepos} from "../../redux/reducers/RepositoriesReducer/ActionCreators";
import RepositoriesPaginate from "../../components/Repositories/RepositoriesContainer";
import {useReposFilterParams} from "../../helpers/hooks/useReposFilterParams";
import ReposFilters from "../../components/ReposFilters/ReposFilters";

const RepositoriesPage: FC = () => {
    //for test you can use: arthurshag, gaearon, TalisMan701
    const {params, setParams, saveUrlParams} = useReposFilterParams();
    const page = useRef(1);
    const dispatch = useAppDispatch();
    const fetchReposPaginateOnClick = () => {
        page.current = page.current + 1;
        saveUrlParams();
        dispatch(fetchMoreRepos({...params, page: page.current}));
    }

    const resetHandler = () => {
        saveUrlParams();
        page.current = 1;
    };

    return (
        <>
            <ReposFilters params={params} setParams={setParams} reset={resetHandler}/>
            <RepositoriesPaginate fetchReposPaginateOnClick={fetchReposPaginateOnClick}/>
        </>
    );
};




export default RepositoriesPage;
