import {AppDispatch} from "../../redux-store";
import {reposAPI} from "../../../api/api";
import {repositoriesSlice} from "./RepositoriesReducer";
import {IRepository, ListUserReposType, ReposRequestParamsType} from "../../../models/IRepository";

const {
    fetchingError,
    fetchingSuccess,
    fetching,
    paginateFetchingSuccess,
    paginateFetching,
    paginateFetchingError,
    paginateSetCouldLoadMore
} = repositoriesSlice.actions;

export const fetchRepos = ({per_page = 10, ...params}: ReposRequestParamsType) => async (dispatch: AppDispatch) => {
    const reqParams = {...params, per_page};
    dispatch(fetching());
    try {
        const responseRepos = await reposAPI.getReposByUser(reqParams);
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

export const fetchMoreRepos = ({per_page = 10, ...params}: ReposRequestParamsType) => async (dispatch: AppDispatch) => {
    const reqParams = {...params, per_page};
    dispatch(paginateFetching());
    try {
        const responseRepos = await reposAPI.getReposByUser(reqParams);
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
