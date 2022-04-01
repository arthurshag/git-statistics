import {useSearchParams} from "react-router-dom";
import {ReposRequestParamsType} from "../../models/IRepository";
import {useState} from "react";

export const useReposFilterParams = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const initialState: ReposRequestParamsType = {
        type: searchParams.get(("type")) as ReposRequestParamsType["type"],
        sort: searchParams.get("sort") as ReposRequestParamsType["sort"],
        username: searchParams.get("username") || "",
    };
    const [params, setParams] = useState<ReposRequestParamsType>(initialState);
    const reset = () => setParams(initialState);
    const setValue = (field: string, value: string | undefined) => {
        setParams({...params, [field]: value});
    }

    const saveUrlParams = () => {
        const urlParams: {[key:string]: string} = {};
        (Object.keys(params) as Array<keyof ReposRequestParamsType>).forEach(key => {
            if (params[key]) {
                urlParams[key] = params[key] as string;
            }
        })

        setSearchParams(urlParams);
    }
    return {params, setParams: setValue, reset, saveUrlParams}
}
