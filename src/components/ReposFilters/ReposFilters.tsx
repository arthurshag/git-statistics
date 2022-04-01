import React, {FC} from "react";
import {useAppSelector} from "../../redux/hooks/reduxHooks";
import {ReposRequestParamsType} from "../../models/IRepository";
import FormLogin from "../FormLogin/FormLogin";
import Select from "./Select";

interface IFilters {
    params: ReposRequestParamsType,
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
    const isLoading = useAppSelector(state => state.repositoriesReducer.isLoading);
    const error = useAppSelector(state => state.repositoriesReducer.error);
    const optionsType: ReposRequestParamsType["type"][] = ["all", "member", "owner"];
    const optionsSort: ReposRequestParamsType["sort"][] = ["created", "full_name", "pushed", "updated"];

    const setUsername = (text: string) => {
        setParams("username", text);
    }

    const onchangeFilterType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = optionsType.find((value) => value === event.target.value)
        setParams("type", option)
    }

    const onchangeFilterSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = optionsSort.find((value) => value === event.target.value)
        setParams("sort", option)
    }


    return <>
        <FormLogin handleClick={onSubmit} text={params.username} setText={setUsername} disabled={isLoading}
                   error={error}/>
        <Select options={optionsType as string[]} handler={onchangeFilterType}/>
        <Select options={optionsSort as string[]} handler={onchangeFilterSort}/>
        <button onClick={reset}>reset filters</button>
    </>
}


export default ReposFilters;
