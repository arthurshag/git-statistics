import {AppDispatch} from "../../redux-store";
import {repositoriesSlice} from "./RepositoriesSlice"
import {IRepository, IServerRepositoryWithLanguages, TypeListUserReposData} from "../../../models/IRepository";
import {reposAPI} from "../../../api/api";

const {repsFetchingError, repsFetchingSuccess, repsFetching} = repositoriesSlice.actions;

export const fetchReps = (login: string) => async (dispatch: AppDispatch) => {
    dispatch(repsFetching());
    try {
        const response = await reposAPI.getRepsByUser(login);
        const responseReps = response.data;
        const repsWithLanguages = await addLanguagesDataToReps(responseReps);
        const repositories = repsWithLanguages.map((r) => selectNeededDataRepository(r));
        dispatch(repsFetchingSuccess(repositories));
    } catch (e) {
        dispatch(repsFetchingError((e as Error).toString()))
    }
}

const addLanguagesDataToReps = async (reps: TypeListUserReposData) => {
    return await Promise.all(reps.map((rep) => {
        return new Promise((resolve) => {
            fetchLanguages(rep.owner.login, rep.name)
                .then(response => {
                    resolve({...rep, languages: response})
                })
                .catch((e) => {
                    //todo: обработать ошибку, черт его знает как мб засунуть languages: ["ошибка"]
                    resolve(rep);
                });
        })
    })) as IServerRepositoryWithLanguages[];
}

const fetchLanguages = async (owner: string, repo: string) => {
    return (await reposAPI.fetchLanguages(owner, repo)).data;
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
