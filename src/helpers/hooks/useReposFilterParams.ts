import {useSearchParams} from "react-router-dom";
import {ParamsSearchReposType} from "../../models/IRepository";
import {useCallback, useEffect, useState} from "react";

export type ReposUrlParamsType = {
    username?: string | null,
    page: string,
    filesPerPage: string,
    sort?: ParamsSearchReposType["sort"] | null,
    repo?: string | null,
    languages?: string | null,
    starsMin?: string | null,
    starsMax?: string | null,
    createdFrom?: string | null,
    createdTo?: string | null,
    pushedFrom?: string | null,
    pushedTo?: string | null
}

type SetValueType = <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void

export const useReposFilterParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams: ReposUrlParamsType = {
        sort: searchParams.get("sort") as ParamsSearchReposType["sort"],
        username: searchParams.get("username"),
        page: (searchParams.get("page") || "1"),
        filesPerPage: "10",
        repo: searchParams.get("repo"),
        languages: searchParams.get("languages"),
        starsMin: searchParams.get("starsMin"),
        starsMax: searchParams.get("starsMax"),
        createdFrom: searchParams.get("createdFrom"),
        createdTo: searchParams.get("createdTo"),
        pushedFrom: searchParams.get("pushedFrom"),
        pushedTo: searchParams.get("pushedTo"),
    };

    const [newParams, setNewParams] = useState<ReposUrlParamsType>(currentParams);
    useEffect(() => {
        setNewParams(currentParams);
    }, [...Object.values(currentParams)])

    const reset = () => setNewParams({username: "", page: "1", filesPerPage: "10"});
    const setValue: SetValueType = useCallback((field, value) => {
        setNewParams((state) => ({...state, [field]: value}));
    }, [])

    const saveParamsInUrl = useCallback((params: ReposUrlParamsType) => {
        const urlParams = new URLSearchParams();
        (Object.keys(params) as Array<keyof ReposUrlParamsType>).forEach(key => {
            if (params[key] && key !== "filesPerPage") {
                urlParams.append(key, String(params[key]))
            }
        })

        setSearchParams(urlParams);
    }, [])

    return {
        newParams: newParams, currentParams: currentParams, setParams: setValue, reset,
        saveParamsInUrl
    };
}
