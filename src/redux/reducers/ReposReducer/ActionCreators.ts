import {AppDispatch} from "../../redux-store";
import {repositoriesSlice} from "./RepositoriesSlice"
import axios from "axios";
import {IRepository} from "../../../models/IRepository";

const {repsFetchingError, repsFetchingSuccess, repsFetching} = repositoriesSlice.actions;

export const fetchReps = (url: string) => async (dispatch: AppDispatch) => {
    dispatch(repsFetching());
    try {
        const response = await axios.get<Array<any>>(url);
        const responseReps = response.data;
        const repsWithLanguages = await addLanguagesToServerReps(responseReps);
        const repositories = repsWithLanguages.map((r) => selectNeededDataRepository(r));
        dispatch(repsFetchingSuccess(repositories));
    } catch (e) {
        dispatch(repsFetchingError((e as Error).toString()))
    }
}

const addLanguagesToServerReps = async (reps: Array<any>) => {
    return await Promise.all(reps.map((e) => {
        return new Promise((resolve) => {
            fetchLanguages(e.languages_url)
                .then(response => {
                    resolve({...e, languages: response})
                })
                .catch((e) => {
                    resolve({error: e.message});
                });
        })
    })) as IRepository[];
}

const fetchLanguages = async (url: string) => {
    return (await axios.get<{ [key: string]: number }>(url)).data;
}

const selectNeededDataRepository = ({
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
