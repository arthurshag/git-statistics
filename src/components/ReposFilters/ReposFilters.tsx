import React, {FC} from "react";
import Select, {SingleValue} from "react-select"
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
    const optionsSort = [
        {label: "created", value: "created"},
        {label: "full_name", value: "full_name"},
        {label: "pushed", value: "pushed"},
        {label: "updated", value: "updated"},
    ];
    const currentOptionSort = params.sort && optionsSort.find((e) => params.sort === e.value);

    const setUsername = (text: string) => {
        setParams("username", text);
    }

    const onchangeFilterSort = (value: SingleValue<{ label: string; value: string; }>) => {
        if (value)
            setParams("sort", value.value)
    }

    return <>
        <input value={params.username} onChange={(e) => setUsername(e.target.value)}/>
        <Select options={optionsSort} onChange={onchangeFilterSort} isClearable={true} value={currentOptionSort}/>
        <button onClick={onSubmit}>fetch</button>
        <button onClick={reset}>reset filters</button>
    </>
}


export default ReposFilters;
