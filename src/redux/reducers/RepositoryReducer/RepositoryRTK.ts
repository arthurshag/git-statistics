import {createApi} from '@reduxjs/toolkit/query/react'
import {reposAPI} from "../../../api/apiReposForQuery";
import {IRepository, SearchReposType} from "../../../models/IRepository";
import {ILanguage} from "../../../models/ILanguage";
import {IContributors} from "../../../models/IContributors";
import {IRepoEvents} from "../../../models/IRepoEvents";
import {ICommits} from "../../../models/ICommits";
import {IPulls} from "../../../models/IPulls";
import {IIssues} from "../../../models/IIssues";


type PropsType<T extends keyof typeof reposAPI> = {
    params: Parameters<typeof reposAPI[T]>[0],
    url: T
}


export const repositoryApi = createApi({
    reducerPath: 'repositoryApi',
    baseQuery: async (args: PropsType<keyof typeof reposAPI>,
                      {signal, dispatch, getState},
                      extraOptions) => {
        try {
            //todo: fix
            return await reposAPI[args.url](args.params as any);
        } catch (e) {
            const error = e as Error;
            return {error: error.message};
        }
    },
    endpoints: (builder) => ({
        getRepositories: builder.query <SearchReposType, PropsType<"getRepos">["params"]>
        ({
            query: (params) => ({params, url: "getRepos"}),
        }),
        getRepository: builder.query <IRepository, PropsType<"getRepo">["params"]>
        ({
            query: (params) => ({params, url: "getRepo"}),
        }),
        getLanguages: builder.query <ILanguage, PropsType<"getLanguages">["params"]>
        ({
            query: (params) => ({params, url: "getLanguages"}),
        }),
        getContributors: builder.query <IContributors, PropsType<"getContributors">["params"]>
        ({
            query: (params) => ({params, url: "getContributors"}),
        }),
        getEvents: builder.query <IRepoEvents, PropsType<"getEvents">["params"]>
        ({
            query: (params) => ({params, url: "getEvents"}),
        }),
        getAllCommits: builder.query <ICommits, PropsType<"getAllCommits">["params"]>
        ({
            query: (params) => ({params, url: "getAllCommits"}),
        }),
        getClosedPulls: builder.query <IPulls, PropsType<"getClosedPulls">["params"]>
        ({
            query: (params) => ({params, url: "getClosedPulls"}),
        }),
        getClosedIssues: builder.query <IIssues, PropsType<"getClosedIssues">["params"]>
        ({
            query: (params) => ({params, url: "getClosedIssues"}),
        }),
    }),
})

// auto-generated based on the defined endpoints
export const {
    useLazyGetRepositoriesQuery,
    useGetRepositoriesQuery,
    useGetRepositoryQuery,
    useGetContributorsQuery,
    useGetEventsQuery,
    useGetLanguagesQuery,
    useGetAllCommitsQuery,
    useGetClosedPullsQuery,
    useGetClosedIssuesQuery,
} = repositoryApi;
