import React, {FC, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {fetchMoreRepos, fetchRepos} from "../../redux/reducers/RepositoriesReducer/ActionCreators";
import FormLogin from "../../components/FormLogin/FormLogin";
import RepositoriesPaginate from "../../components/Repositories/RepositoriesContainer";

const RepositoriesPage: FC = () => {
    //for test you can use: arthurshag, gaearon, TalisMan701
    const count = useRef(2);
    const [login, setLogin] = useState("arthurshag");
    const isLoading = useAppSelector(state => state.repositoriesReducer.isLoading);
    const error = useAppSelector(state => state.repositoriesReducer.error);

    const dispatch = useAppDispatch();

    const fetchReposOnClick = () => {
        count.current = 2;
        dispatch(fetchRepos(login))
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
