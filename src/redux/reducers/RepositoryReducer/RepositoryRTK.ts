import {createApi} from '@reduxjs/toolkit/query/react'
import {reposAPI} from "../../../api/apiReposForQuery";
import {IRepository} from "../../../models/IRepository";
import {ILanguage} from "../../../models/ILanguage";
import {IContributors} from "../../../models/IContributors";
import {IRepoEvents} from "../../../models/IRepoEvents";


type PropsType = {
    params: {
        owner: string, repo: string
    },
    url: keyof typeof reposAPI
}

export const repositoryApi = createApi({
    reducerPath: 'repositoryApi',
    baseQuery: (args: PropsType,
                {signal, dispatch, getState},
                extraOptions) => {
        try {
            debugger
            return reposAPI[args.url](args.params);
        } catch (e) {
            const error = e as Error;
            return {error: {status: 0, data: error.message}};
        }
    },
    endpoints: (builder) => ({
        getRepositories: builder.query <IRepository[], { owner: string }>
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
    }),
})

// auto-generated based on the defined endpoints
export const {
    useGetRepositoriesQuery,
    useGetRepositoryQuery,
    useGetContributorsQuery,
    useGetEventsQuery,
    useGetLanguagesQuery
} = repositoryApi;
