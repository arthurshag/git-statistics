import {useSearchParams} from "react-router-dom";
import {ParamsSearchReposType} from "../../models/IRepository";
import {useState} from "react";

export type ReposUrlParamsType = {
    username?: string | null,
    page: string,
    sort?: ParamsSearchReposType["sort"] | null,
    repo?: string | null,
    languages?: string | null,
    starsMin?: string | null,
    starsMax?: string | null
    dateFrom?: string | null
    dateTo?: string | null
}

type SetValueType = <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void

//todo: maybe take string fields in param and configure parameters from the url for them
export const useReposFilterParams = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const currentParams: ReposUrlParamsType = {
        sort: searchParams.get("sort") as ParamsSearchReposType["sort"],
        username: searchParams.get("username"),
        page: (searchParams.get("page") || "1"),
        repo: searchParams.get("repo"),
        languages: searchParams.get("languages"),
        starsMin: searchParams.get("starsMin"),
        starsMax: searchParams.get("starsMax"),
        dateFrom: searchParams.get("dateFrom"),
        dateTo: searchParams.get("dateTo"),
    };
    const [newParams, setNewParams] = useState<ReposUrlParamsType>(currentParams);
    const reset = () => setNewParams({username: "", page: "1"});
    const setValue: SetValueType = (field, value) => {
        setNewParams((state) => ({...state, [field]: value}));
    }

    const saveParamsInUrl = (params: ReposUrlParamsType) => {
        const urlParams = new URLSearchParams();
        (Object.keys(params) as Array<keyof ReposUrlParamsType>).forEach(key => {
            if (params[key]) {
                urlParams.append(key, String(params[key]))
            }
        })

        setSearchParams(urlParams);
    }

    return {
        newParams: newParams, currentParams: currentParams, setParams: setValue, reset,
        saveParamsInUrl
    };
}
