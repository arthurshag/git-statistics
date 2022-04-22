import {
    useGetAllRepositoriesQuery,
    useLazyGetAllCommitsQuery,
    useLazyGetContributorsQuery,
    useLazyGetLanguagesQuery
} from "../reducers/UserReducer/UserRTK";
import {useEffect} from "react";
import {IRepository} from "../../models/IRepository";

export const useCommitsByAllRepos = (username: string) => {
    const {data: repos, error, isLoading, isFetching} = useGetAllRepositoriesQuery({q: `user:${username}`});
    const [trigger, result] = useLazyGetAllCommitsQuery();
    useTriggerWhenReposComes(repos, trigger);
    return {
        data: result.data,
        error: error || result.error,
        isLoading: result.isLoading || isLoading,
        isFetching: result.isFetching || isFetching
    };
};


export const useCollaboratorsByAllRepos = (username: string) => {
    const {data: repos, error, isLoading, isFetching} = useGetAllRepositoriesQuery({q: `user:${username}`})
    const [trigger, result] = useLazyGetContributorsQuery();
    useTriggerWhenReposComes(repos, trigger);

    return {
        data: result.data,
        error: error || result.error,
        isLoading: result.isLoading || isLoading,
        isFetching: result.isFetching || isFetching
    };
}


export const useLanguagesByAllRepos = (username: string) => {
    const {data: repos, error, isLoading, isFetching} = useGetAllRepositoriesQuery({q: `user:${username}`})
    const [trigger, result] = useLazyGetLanguagesQuery();
    useTriggerWhenReposComes(repos, trigger);
    return {
        data: result.data,
        error: error || result.error,
        isLoading: result.isLoading || isLoading,
        isFetching: result.isFetching || isFetching
    };
}


const useTriggerWhenReposComes = <T extends (array: { owner: string, repo: string }[]) => void>(repos: IRepository[] | undefined, trigger: T) => {
    useEffect(() => {
        if (!repos) {
            return;
        }
        const initial: { owner: string, repo: string }[] = [];
        const array = repos.reduce((filtered, current) => {
            if (current.owner) {
                filtered.push({owner: current.owner.login || "", repo: current.name})
            }
            return filtered;
        }, initial);

        if (array.length > 0)
            trigger(array);
    }, [repos])
}
