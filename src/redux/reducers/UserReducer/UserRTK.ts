import {createApi} from '@reduxjs/toolkit/query/react'
import {IRepository} from "../../../models/IRepository";
import {usersAPI} from "../../../api/apiUserForQuery";
import {IContributors} from "../../../models/IContributors";
import {UserGitType} from "../../../models/IUser";
import {ILanguage} from "../../../models/ILanguage";
import {ICommits} from "../../../models/ICommits";
import {IEvents} from "../../../models/IEvents";
import {profileSlice} from "../ProfileReducer/ProfileSlice";


type PropsType<T extends keyof typeof usersAPI> = {
    params: Parameters<typeof usersAPI[T]>[0],
    url: T
}

export const usersRTK = createApi({
    reducerPath: 'usersApi',
    baseQuery: async (args: PropsType<keyof typeof usersAPI>,  { signal, dispatch, getState }) => {
        try {
            return await usersAPI[args.url](args.params as any);
        } catch (e) {
            const error = e as Error;
            if (error.message.toLowerCase().includes("API rate limit exceeded".toLowerCase())){
                dispatch(profileSlice.actions.setMessage("You need to log in to continue using the app"))
            }
            return {error: error.message};
        }
    },
    endpoints: (builder) => ({
        getUser: builder.query <UserGitType, PropsType<"getUser">["params"]>
        ({
            query: (params) => ({params, url: "getUser"}),
        }),
        getAllUserCommitsForLastYear: builder.query <ICommits, PropsType<"getAllUserCommitsForLastYear">["params"]>
        ({
            query: (params) => ({params, url: "getAllUserCommitsForLastYear"}),
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
        getEvents: builder.query <IEvents, PropsType<"getEvents">["params"]>
        ({
            query: (params) => ({params, url: "getEvents"}),
        }),
    }),
})

// auto-generated based on the defined endpoints
export const {
    useGetAllRepositoriesQuery,
    useGetUserQuery,
    useLazyGetAllUserCommitsForLastYearQuery,
    useGetAllUserCommitsForLastYearQuery,
    useLazyGetContributorsQuery,
    useLazyGetLanguagesQuery,
    useGetEventsQuery,
} = usersRTK;
