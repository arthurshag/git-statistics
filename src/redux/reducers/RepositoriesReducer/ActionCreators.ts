import {AppDispatch} from "../../redux-store";
import {reposAPI} from "../../../api/api";
import {repositoriesSlice} from "./RepositoriesReducer";
import {IRepository, ListUserReposType} from "../../../models/IRepository";

const {
    fetchingError,
    fetchingSuccess,
    fetching,
    paginateFetchingSuccess,
    paginateFetching,
    paginateFetchingError,
    paginateSetCouldLoadMore
} = repositoriesSlice.actions;

export const fetchRepos = (login: string, per_page = 10) => async (dispatch: AppDispatch) => {
    dispatch(fetching());
    try {
        const responseRepos = await reposAPI.getReposByUser(login);
        const reposWithLanguages = await addLanguagesDataToRepos(responseRepos);
        if (reposWithLanguages.length < per_page) {
            dispatch(paginateSetCouldLoadMore(false));
        } else {
            dispatch(paginateSetCouldLoadMore(true));
        }
        dispatch(fetchingSuccess(reposWithLanguages));
    } catch (e) {
        dispatch(fetchingError((e as Error).toString()))
    }
}

export const fetchMoreRepos = (login: string, page = 1, per_page = 10) => async (dispatch: AppDispatch) => {
    dispatch(paginateFetching());
    try {
        const responseRepos = await reposAPI.getReposByUser(login, page, per_page);
        const reposWithLanguages = await addLanguagesDataToRepos(responseRepos);
        if (reposWithLanguages.length < per_page) {
            dispatch(paginateSetCouldLoadMore(false));
        } else {
            dispatch(paginateSetCouldLoadMore(true));
        }
        dispatch(paginateFetchingSuccess(reposWithLanguages));
    } catch (e) {
        dispatch(paginateFetchingError((e as Error).toString()))
    }
}

const addLanguagesDataToRepos = (repos: ListUserReposType) => {
    return Promise.all(repos.map(async (rep) => {
        try {
            const languages = await reposAPI.fetchLanguages(rep.owner.login, rep.name);
            return {...rep, languages: languages}
        } catch {
            return rep;
        }
    })) as Promise<IRepository[]>;
}
