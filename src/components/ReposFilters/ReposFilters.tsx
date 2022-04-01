import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {ReposRequestParamsType} from "../../models/IRepository";
import {fetchRepos} from "../../redux/reducers/RepositoriesReducer/ActionCreators";
import FormLogin from "../FormLogin/FormLogin";

interface IFilters {
    params: ReposRequestParamsType,
    setParams: (field: string, value: string | undefined) => void,
    reset: () => void
}


const ReposFilters: FC<IFilters> = ({
                                        params,
                                        reset,
                                        setParams
                                    }) => {
    const isLoading = useAppSelector(state => state.repositoriesReducer.isLoading);
    const error = useAppSelector(state => state.repositoriesReducer.error);
    const optionsType: ReposRequestParamsType["type"][] = ["all", "member", "owner"];
    const optionsSort: ReposRequestParamsType["sort"][] = ["created", "full_name", "pushed", "updated"];
    const dispatch = useAppDispatch();

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

    const fetchReposOnClick = () => {
        dispatch(fetchRepos(params));
    }

    return <>
        <FormLogin handleClick={fetchReposOnClick} text={params.username} setText={setUsername} disabled={isLoading}
                   error={error}/>
        <Select options={optionsType as string[]} handler={onchangeFilterType}/>
        <Select options={optionsSort as string[]} handler={onchangeFilterSort}/>
    </>
}


interface IProps {
    options: string[],
    handler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

//todo: use library react select
const Select: FC<IProps> = ({
                                options,
                                handler
                            }) => {
    const optionsUI = options.map((e) => {
        return <option key={e}>{e}</option>
    })
    return <select onChange={handler}>
        {optionsUI}
    </select>
}

export default ReposFilters;
