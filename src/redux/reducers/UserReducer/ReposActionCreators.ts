import {AppDispatch} from "../../redux-store";
import {IRepository, IServerRepositoryWithLanguages, ListUserReposType} from "../../../models/IRepository";
import {reposAPI} from "../../../api/api";
import {userSlice} from "./UserSlice";

const {repsFetchingError, repsFetchingSuccess, repsFetching} = userSlice.actions;

export const fetchReps = (login: string) => async (dispatch: AppDispatch) => {
    dispatch(repsFetching());
    try {
        const responseRepos = await reposAPI.getRepsByUser(login);
        const repsWithLanguages = await addLanguagesDataToReps(responseRepos);
        const repositories = repsWithLanguages.map((r) => selectNeededDataRepository(r));
        dispatch(repsFetchingSuccess(repositories));
    } catch (e) {
        dispatch(repsFetchingError((e as Error).toString()))
    }
}

const addLanguagesDataToReps = (repos: ListUserReposType) => {
    return Promise.all(repos.map(async (rep) => {
        try {
            const languages = await reposAPI.fetchLanguages(rep.owner.login, rep.name);
            return {...rep, languages: languages}
        } catch {
            return rep;
        }
    })) as Promise<IServerRepositoryWithLanguages[]>;
}

const selectNeededDataRepository = ({
                                        full_name,
                                        clone_url,
                                        created_at,
                                        description,
                                        forks_count,
                                        html_url,
                                        id,
                                        language,
                                        languages,
                                        name,
                                        owner,
                                        stargazers_count,
                                        topics,
                                        updated_at,
                                        watchers_count
                                    }: IServerRepositoryWithLanguages): IRepository => {
    return {
        full_name,
        clone_url,
        created_at,
        description,
        forks_count,
        html_url,
        language,
        id,
        languages,
        name,
        owner,
        stargazers_count,
        topics,
        updated_at,
        watchers_count
    }
}
