import {AppDispatch} from "../../redux-store";
import {reposAPI} from "../../../api/api";
import {repoSlice} from "./UserSlice"
import {IRepository, ServerRepositoryType} from "../../../models/IRepository";

export const fetchRepo = (owner: string, repoName: string) => async (dispatch: AppDispatch) => {
    dispatch(repoSlice.actions.fetching())
    try {
        const repo = await reposAPI.getRepo(owner, repoName);
        const repoWithLanguage = await addLanguagesDataToRepo(repo);
        dispatch(repoSlice.actions.fetchingSuccess(repoWithLanguage));
    } catch (error) {
        dispatch(repoSlice.actions.fetchingError((error as Error).message))

    }
}


const addLanguagesDataToRepo = async (repo: ServerRepositoryType): Promise<IRepository> => {
    try {
        const languages = await reposAPI.fetchLanguages(repo.owner.login, repo.name);
        return {...repo, languages: languages}
    } catch {
        return repo;
    }
}
