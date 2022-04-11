import React, {ChangeEvent, FC, FormEvent, useMemo} from "react";
import Select, {MultiValue, SingleValue} from "react-select"
import {ReposUrlParamsType} from "../../helpers/hooks/useReposFilterParams";
import TextInput from "../utils/TextInput/TextInput";
import CreatableSelect from "react-select/creatable";
import Button from "../utils/Button/Button";
import classes from "./ReposFilters.module.scss";
import classNames from "classnames";

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
    const currentOptionSort = params.sort ? optionsSort.find((e) => params.sort === e.value) : null;
    const currentOptionsLanguages = params.languages ?
        params.languages.split(" ").map((e) => ({label: e, value: e})) : null;

    const memoizedGetHandlers = useMemo(() => getHandlers(setParams), [setParams]);
    const {
        onChangeFilterSort,
        onChangeLanguages,
        setStarsMax,
        setStarsMin,
        setRepoName,
        onSubmitForm,
        setUsername,
        setCreatedFrom,
        setPushedFrom,
        setPushedTo,
        setCreatedTo
    } = memoizedGetHandlers;

    return <form onSubmit={onSubmitForm} className={classes.filters}>
        <TextInput placeholder={"Repo name"} value={params.repo || ""} onChange={setRepoName}/>
        <TextInput placeholder={"Login user"} value={params.username || ""} onChange={setUsername}/>
        <div className={classes.filters__twoInOne}>
            <CreatableSelect
                placeholder={"Languages"}
                isMulti
                value={currentOptionsLanguages}
                onChange={onChangeLanguages}
                options={[]}
            />
            <Select options={optionsSort} onChange={onChangeFilterSort} isClearable={true} value={currentOptionSort}
                    placeholder={"Sort type"}/>
        </div>
        <div className={classes.filters__flex}>
            <div className={classNames(classes.filters__twoInOne)}>
                <TextInput label={"Stars min"} type={"number"} value={params.starsMin || ""} onChange={setStarsMin}/>
                <TextInput label={"Stars max"} type={"number"} value={params.starsMax || ""} onChange={setStarsMax}/>
            </div>

            <div className={classNames(classes.filters__flex, classes.filters__flexItem)}>
                <div className={classNames(classes.filters__twoInOne, classes.filters__flexItem)}>
                    <TextInput label={"Pushed from"} type={"date"} value={params.pushedFrom || ""}
                               onChange={setPushedFrom}/>
                    <TextInput label={"Pushed to"} type={"date"} value={params.pushedTo || ""} onChange={setPushedTo}/>
                </div>
                <div className={classNames(classes.filters__twoInOne, classes.filters__flexItem)}>
                    <TextInput label={"Created from"} type={"date"} value={params.createdFrom || ""}
                               onChange={setCreatedFrom}/>
                    <TextInput label={"Created to"} type={"date"} value={params.createdTo || ""}
                               onChange={setCreatedTo}/>
                </div>
            </div>
        </div>
        <Button type={"primary"} onClick={onSubmit}>Find</Button>
        <Button type={"danger"} onClick={reset}>Reset filters</Button>
    </form>
}


function getHandlers(setParams: <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void) {
    //todo: мб сразу в объект пихать
    const setUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("username", e.target.value);
    }

    const setRepoName = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("repo", e.target.value);
    }

    const onChangeLanguages = (value: MultiValue<{ label: string; value: string; }>) => {
        setParams("languages", value ? value.map(e => e.label).join(" ") : null);
    }

    const onChangeFilterSort = (value: SingleValue<{ label: string; value: string; }>) => {
        setParams("sort", value ? value.value as ReposUrlParamsType["sort"] : null)
    }

    const setStarsMax = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("starsMax", e.target.value);
    }

    const setStarsMin = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("starsMin", e.target.value);
    }


    const setPushedFrom = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("pushedFrom", e.target.value);
    }

    const setPushedTo = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("pushedTo", e.target.value);
    }

    const setCreatedFrom = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("createdFrom", e.target.value);
    }

    const setCreatedTo = (e: ChangeEvent<HTMLInputElement>) => {
        setParams("createdTo", e.target.value);
    }


    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return {
        setUsername,
        setRepoName,
        onChangeFilterSort,
        onChangeLanguages,
        setStarsMax,
        setStarsMin,
        onSubmitForm,
        setPushedFrom,
        setPushedTo,
        setCreatedTo,
        setCreatedFrom,
    };
}


export default ReposFilters;
