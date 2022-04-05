import {useSearchParams} from "react-router-dom";
import {ParamsSearchReposType} from "../../models/IRepository";
import {useRef, useState} from "react";

export type ReposUrlParamsType = {
    username: string,
    page: number,
    sort?: ParamsSearchReposType["sort"] | null,
}

export const useReposFilterParams = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const currentParams: ReposUrlParamsType = {
        sort: searchParams.get("sort") as ParamsSearchReposType["sort"],
        username: searchParams.get("username") || "",
        page: +(searchParams.get("page") || 1),
    };
    const [newParams, setNewParams] = useState<ReposUrlParamsType>(currentParams);
    const reset = () => setNewParams({username: "", page: 1});
    const setValue = (field: string, value: string | undefined | number) => {
        setNewParams((state) => ({...state, [field]: value}));
    }

    const saveParamsInUrl = (params: ReposUrlParamsType) => {
        const urlParams: { [key: string]: string } = {};
        (Object.keys(params) as Array<keyof ReposUrlParamsType>).forEach(key => {
            if (params[key]) {
                urlParams[key] = <string>params[key]
            }
        })

        setSearchParams(urlParams);
    }

    return {
        newParams: newParams, currentParams: currentParams, setParams: setValue, reset,
        saveParamsInUrl
    };
}
