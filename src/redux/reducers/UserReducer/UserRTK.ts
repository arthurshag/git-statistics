import {createApi} from '@reduxjs/toolkit/query/react'
import {IRepository} from "../../../models/IRepository";
import {usersAPI} from "../../../api/apiUserForQuery";
import {IContributors} from "../../../models/IContributors";
import {UserGitType} from "../../../models/IUser";
import {ILanguage} from "../../../models/ILanguage";
import {ICommits} from "../../../models/ICommits";


type PropsType<T extends keyof typeof usersAPI> = {
    params: Parameters<typeof usersAPI[T]>[0],
    url: T
}


export const usersRTK = createApi({
    reducerPath: 'usersApi',
    baseQuery: async (args) => {
        try {
            // @ts-ignore
            return await usersAPI[args.url](args.params as any);
        } catch (e) {
            const error = e as Error;
            return {error: error.message};
        }
    },
    endpoints: (builder) => ({
        getUser: builder.query <UserGitType, PropsType<"getUser">["params"]>
        ({
            query: (params) => ({params, url: "getUser"}),

        }),
        getAllCommits: builder.query <ICommits, PropsType<"getAllUserCommits">["params"]>
        ({
            query: (params) => ({params, url: "getAllUserCommits"}),
        }),
        getContributors: builder.query <(IContributors[0] & { count: number })[], PropsType<"getUserContributors">["params"]>
        ({
            query: (params) => ({params, url: "getUserContributors"}),
        }),
        getLanguages: builder.query <ILanguage, PropsType<"getUserLanguages">["params"]>
        ({
            query: (params) => ({params, url: "getUserLanguages"}),
        }),
        getAllRepositories: builder.query <IRepository[], PropsType<"getAllRepos">["params"]>
        ({
            query: (params) => ({params, url: "getAllRepos"}),
        }),
    }),
})

// auto-generated based on the defined endpoints
export const {
    useGetAllRepositoriesQuery,
    useGetUserQuery,
    useLazyGetAllCommitsQuery,
    useGetAllCommitsQuery,
    useLazyGetContributorsQuery,
    useLazyGetLanguagesQuery,
} = usersRTK;
