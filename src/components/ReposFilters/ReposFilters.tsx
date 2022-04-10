import React, {ChangeEvent, FC, FormEvent, MouseEvent} from "react";
import Select, {MultiValue, SingleValue} from "react-select"
import {ReposUrlParamsType} from "../../helpers/hooks/useReposFilterParams";
import TextInput from "../utils/TextInput/TextInput";
import CreatableSelect from "react-select/creatable";
import Button from "../utils/Button/Button";

interface IFilters {
    params: ReposUrlParamsType,
    setParams: <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void,
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
    //todo: add default options languages
    const currentOptionSort = params.sort && optionsSort.find((e) => params.sort === e.value);
    const currentOptionsLanguages = params.languages ?
        params.languages.split(" ").map((e) => ({label: e, value: e})) : undefined;

    const setUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("username", e.target.value);
    }

    const setRepoName = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("repo", e.target.value);
    }

    const onChangeLanguages = (value: MultiValue<{ label: string; value: string; }>) => {
        setParams("languages", value ? value.map(e => e.label).join(" ") : null);
    }

    const onchangeFilterSort = (value: SingleValue<{ label: string; value: string; }>) => {
        setParams("sort", value ? value.value as ReposUrlParamsType["sort"] : null)
    }

    const setStarsMax = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("starsMax", e.target.value);
    }

    const setStarsMin = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("starsMin", e.target.value);
    }

    const onReset = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        reset();
    }

    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit();
    }

    return <form onSubmit={onSubmitForm}>
        <TextInput placeholder={"Repo name"} value={params.repo || ""} onChange={setRepoName}/>
        <TextInput placeholder={"Login user"} value={params.username || ""} onChange={setUsername}/>
        <CreatableSelect
            placeholder={"Languages"}
            isMulti
            value={currentOptionsLanguages}
            onChange={onChangeLanguages}
            options={[]}
        />
        <Select options={optionsSort} onChange={onchangeFilterSort} isClearable={true} value={currentOptionSort}
                placeholder={"sort type"}/>
        <TextInput label={"Stars min"} type={"number"} value={params.starsMin || ""} onChange={setStarsMin}/>
        <TextInput label={"Stars max"} type={"number"} value={params.starsMax || ""} onChange={setStarsMax}/>
        <Button type={"primary"} onClick={onSubmit}>fetch</Button>
        <Button type={"danger"} onClick={onReset}>reset filters</Button>
    </form>
}


export default ReposFilters;
