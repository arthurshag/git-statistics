import React, {ChangeEvent, FC, FormEvent, useMemo} from "react";
import Select, {MultiValue, SingleValue} from "react-select"
import {ReposUrlParamsType} from "../../helpers/hooks/useReposFilterParams";
import TextInput from "../utils/TextInput/TextInput";
import classes from "./ReposFilters.module.scss";
import {ParamsSearchReposType} from "../../models/IRepository";
import CreatableSelect from "react-select/creatable";
import classNames from "classnames";

interface IFilters {
    params: ReposUrlParamsType,
    setParams: <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void,
}

const optionsSort: { label: string, value: ParamsSearchReposType["sort"] }[] = [
    {label: "Updated", value: "updated"},
    {label: "Stars", value: "stars"},
    {label: "Forks", value: "forks"},
    {label: "Help wanted issues", value: "help-wanted-issues"},
];

const optionsLanguages = [
    {label: "C#", value: "c#"},
    {label: "Javascript", value: "javascript"},
    {label: "Typescript", value: "typescript"},
    {label: "C++", value: "C++"},
    {label: "Python", value: "python"},
    {label: "Java", value: "Java"},
    {label: "PHP", value: "PHP"},
];


const ReposAddFilters: FC<IFilters> = ({
                                           params,
                                           setParams,
                                       }) => {
    const currentOptionSort = params.sort ? optionsSort.find((e) => params.sort === e.value) : null;
    const currentOptionsLanguages = params.languages ?
        params.languages.split(" ").map((e) => ({label: e, value: e})) : null;

    const memoizedGetHandlers = useMemo(() => getHandlers(setParams), [setParams]);
    const {
        onChangeFilterSort,
        onChangeLanguages,
        setStarsMax,
        setStarsMin,
        setCreatedFrom,
        setPushedFrom,
        setPushedTo,
        setCreatedTo
    } = memoizedGetHandlers;

    return (<>
        <div className={classes.filters__twoInOne}>
            <CreatableSelect
                placeholder={"Languages"}
                isMulti
                value={currentOptionsLanguages}
                onChange={onChangeLanguages}
                options={optionsLanguages}
            />
            <Select options={optionsSort} onChange={onChangeFilterSort} isClearable={true}
                    value={currentOptionSort}
                    placeholder={"Sort type"} inputValue={""}/>
        </div>
        <div className={classes.filters__flex}>
            <div className={classNames(classes.filters__twoInOne)}>
                <TextInput label={"Stars min"} type={"number"} value={params.starsMin || ""}
                           onChange={setStarsMin}/>
                <TextInput label={"Stars max"} type={"number"} value={params.starsMax || ""}
                           onChange={setStarsMax}/>
            </div>

            <div className={classNames(classes.filters__flex, classes.filters__flexItem)}>
                <div className={classNames(classes.filters__twoInOne, classes.filters__flexItem)}>
                    <TextInput label={"Pushed from"} type={"date"} value={params.pushedFrom || ""}
                               onChange={setPushedFrom}/>
                    <TextInput label={"Pushed to"} type={"date"} value={params.pushedTo || ""}
                               onChange={setPushedTo}/>
                </div>
                <div className={classNames(classes.filters__twoInOne, classes.filters__flexItem)}>
                    <TextInput label={"Created from"} type={"date"} value={params.createdFrom || ""}
                               onChange={setCreatedFrom}/>
                    <TextInput label={"Created to"} type={"date"} value={params.createdTo || ""}
                               onChange={setCreatedTo}/>
                </div>
            </div>
        </div>
    </>);
}


function getHandlers(setParams: <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void) {

    const onChangeLanguages = (value: MultiValue<{ label: string; value: string; }>) => {
        setParams("languages", value ? value.map(e => e.label).join(" ") : null);
    }

    const onChangeFilterSort = (value: SingleValue<{ label: string, value: ParamsSearchReposType["sort"] }>) => {
        setParams("sort", value ? value.value : null)
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


export default ReposAddFilters;
