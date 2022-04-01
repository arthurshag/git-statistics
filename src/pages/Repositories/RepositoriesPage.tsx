import React, {FC, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {fetchMoreRepos, fetchRepos} from "../../redux/reducers/RepositoriesReducer/ActionCreators";
import FormLogin from "../../components/FormLogin/FormLogin";
import RepositoriesPaginate from "../../components/Repositories/RepositoriesContainer";
import {useSearchParams} from "react-router-dom";

const RepositoriesPage: FC = () => {
    //for test you can use: arthurshag, gaearon, TalisMan701
    let [searchParams, setSearchParams] = useSearchParams();
    const count = useRef(2);
    console.log()
    const [login, setLogin] = useState(searchParams.get("user") || "");
    console.log(login)
    const isLoading = useAppSelector(state => state.repositoriesReducer.isLoading);
    const error = useAppSelector(state => state.repositoriesReducer.error);

    const dispatch = useAppDispatch();

    const fetchReposOnClick = () => {
        count.current = 2;
        dispatch(fetchRepos(login))
        setSearchParams({user: login});
    }

    const fetchReposPaginateOnClick = () => {
        count.current = count.current + 1;
        dispatch(fetchMoreRepos(login, count.current))
    }

    return (
        <>
            <FormLogin handleClick={fetchReposOnClick} text={login} setText={setLogin} disabled={isLoading}
                       error={error}/>
            <RepositoriesPaginate fetchReposPaginateOnClick={fetchReposPaginateOnClick}/>
        </>
    );
};


export default RepositoriesPage;
