import {
    useGetAllRepositoriesQuery,
    useLazyGetAllUserCommitsForLastYearQuery,
    useLazyGetContributorsQuery,
    useLazyGetLanguagesQuery
} from "./UserRTK";
import {useEffect} from "react";
import {IRepository} from "../../../models/IRepository";

export const useGetCommitsByAllRepos = (username: string) => {
    const {data: repos, error, isLoading, isFetching} = useGetAllRepositoriesQuery({q: `user:${username}`});
    const [trigger, result] = useLazyGetAllUserCommitsForLastYearQuery();
    useTriggerWhenReposComes(repos, trigger);

    return {
        data: result.data,
        error: error || result.error,
        isLoading: result.isLoading || isLoading,
        isFetching: result.isFetching || isFetching
    };
};

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

export const useCollaboratorsByAllRepos = (username: string) => {
    const {data: repos, error, isLoading, isFetching} = useGetAllRepositoriesQuery({q: `user:${username}`})
    const [trigger, result] = useLazyGetContributorsQuery();
    useEffect(() => {
        if (!repos || isLoading) {
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
            trigger({repos: array, user: username});
    }, [repos])


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
