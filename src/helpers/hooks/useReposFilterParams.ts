import {useSearchParams} from "react-router-dom";
import {ParamsSearchReposType} from "../../models/IRepository";
import {useState} from "react";

export type ReposUrlParamsType = {
    type?: string | null,
    sort?: string | null,
    username: string,
    page?: string | null
}

export const useReposFilterParams = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const initialState: ReposUrlParamsType = {
        type: searchParams.get(("type")),
        sort: searchParams.get("sort") as ParamsSearchReposType["sort"],
        username: searchParams.get("username") || "",
    };
    const [params, setParams] = useState<ReposUrlParamsType>(initialState);
    const reset = () => setParams({username: ""});
    const setValue = (field: string, value: string | undefined) => {
        setParams({...params, [field]: value});
    }

    const saveUrlParams = () => {
        const urlParams: {[key:string]: string} = {};
        (Object.keys(params) as Array<keyof ReposUrlParamsType>).forEach(key => {
            if (params[key]) {
                urlParams[key] = params[key] as string;
            }
        })

        setSearchParams(urlParams);
    }
    return {params, setParams: setValue, reset, saveUrlParams}
}
