import React, {FC} from "react";
import FormLogin from "../FormLogin/FormLogin";
import Select from "./Select";
import {ReposUrlParamsType} from "../../helpers/hooks/useReposFilterParams";

interface IFilters {
    params: ReposUrlParamsType,
    setParams: (field: string, value: string | undefined) => void,
    reset: () => void
    onSubmit: () => void
}


const ReposFilters: FC<IFilters> = ({
                                        params,
                                        reset,
                                        setParams,
                                        onSubmit
                                    }) => {
    const optionsSort = ["created", "full_name", "pushed", "updated"];

    const setUsername = (text: string) => {
        setParams("username", text);
    }

    const onchangeFilterSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = optionsSort.find((value) => value === event.target.value)
        setParams("sort", option)
    }

    return <>
        <input value={params.username} onChange={(e) => setUsername(e.target.value)}/>
        <Select options={optionsSort as string[]} handler={onchangeFilterSort}/>
        <button onClick={onSubmit}>fetch</button>
        <button onClick={reset}>reset filters</button>
    </>
}


export default ReposFilters;
