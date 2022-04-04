import {createApi} from '@reduxjs/toolkit/query/react'
import {reposAPI} from "../../../api/apiReposForQuery";
import {IRepository, ParamsSearchReposType, SearchReposType} from "../../../models/IRepository";
import {ILanguage} from "../../../models/ILanguage";
import {IContributors} from "../../../models/IContributors";
import {IRepoEvents} from "../../../models/IRepoEvents";
import {ICommits} from "../../../models/ICommits";


type PropsType = {
    params: {
        owner: string, repo: string
    },
    url: keyof typeof reposAPI
}


export const repositoryApi = createApi({
    reducerPath: 'repositoryApi',
    baseQuery: async (args: PropsType,
                {signal, dispatch, getState},
                extraOptions) => {
        try {
            // @ts-ignore
            return await reposAPI[args.url](args.params);
        } catch (e){
            const error = e as Error;
            return {error: error.message};
        }
    },
    endpoints: (builder) => ({
        getRepositories: builder.query <SearchReposType, ParamsSearchReposType>
        ({
            query: (params) => ({params, url: "getRepos" as PropsType["url"]}),
        }),
        getRepository: builder.query <IRepository, PropsType["params"]>
        ({
            query: (params) => ({params, url: "getRepo" as PropsType["url"]}),
        }),
        getLanguages: builder.query <ILanguage, PropsType["params"]>
        ({
            query: (params) => ({params, url: "getLanguages" as PropsType["url"]}),
        }),
        getContributors: builder.query <IContributors, PropsType["params"]>
        ({
            query: (params) => ({params, url: "getContributors" as PropsType["url"]}),
        }),
        getEvents: builder.query <IRepoEvents, PropsType["params"]>
        ({
            query: (params) => ({params, url: "getEvents" as PropsType["url"]}),
        }),
        getAllCommits: builder.query <ICommits, PropsType["params"]>
        ({
            query: (params) => ({params, url: "getAllCommits" as PropsType["url"]}),
        }),
    }),
})

// auto-generated based on the defined endpoints
export const {
    useGetRepositoriesQuery,
    useGetRepositoryQuery,
    useGetContributorsQuery,
    useGetEventsQuery,
    useGetLanguagesQuery,
    useGetAllCommitsQuery
} = repositoryApi;
