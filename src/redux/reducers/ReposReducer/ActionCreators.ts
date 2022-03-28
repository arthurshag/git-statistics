import {AppDispatch} from "../../redux-store";
import {repositoriesSlice} from "./RepositoriesSlice"
import {IRepository} from "../../../models/IRepository";
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

const addLanguagesDataToReps = async (reps: Array<IRepository>) => {
    return await Promise.all(reps.map((e) => {
        return new Promise((resolve) => {
            fetchLanguages(e.full_name)
                .then(response => {
                    resolve({...e, languages: response})
                })
                .catch((e) => {
                    resolve({error: e.message});
                });
        })
    })) as IRepository[];
}

const fetchLanguages = async (full_name: string) => {
    return (await reposAPI.fetchLanguages(full_name)).data;
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
                                    }: IRepository): IRepository => {
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
