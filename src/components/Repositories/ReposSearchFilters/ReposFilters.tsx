import React, {ChangeEvent, FC, FormEvent, useMemo, useState} from "react";
import {ReposUrlParamsType} from "../../../helpers/hooks/useReposFilterParams";
import TextInput from "../../utils/TextInput/TextInput";
import BlockShadow from "../../utils/BlockShadow/BlockShadow";
import Button from "../../utils/Button/Button";
import ReposAddFilters from "./ReposAddFilters";
import classes from "./ReposFilters.module.scss";
import IconWrapper from "../../utils/IconWrapper/IconWrapper";
import {ScreenFullIcon, ScreenNormalIcon, SearchIcon, XIcon} from "@primer/octicons-react";

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

    const [isOpen, setIsOpen] = useState(false);
    const {setRepoName, onSubmitForm, setUsername} = useMemo(() => getHandlers(setParams), [setParams]);
    const onClickMore = () => setIsOpen((prev) => !prev);

    //todo: change ui buttons
    return <BlockShadow>
        <form onSubmit={onSubmitForm} className={classes.filters}>
            <TextInput placeholder={"Repo name"} value={params.repo || ""} onChange={setRepoName}
                       onPressEnter={onSubmit}/>
            <TextInput placeholder={"Login user"} value={params.username || ""} onChange={setUsername}
                       onPressEnter={onSubmit}/>
            {isOpen && <ReposAddFilters params={params} setParams={setParams}/>}
            <Button type={"default"} className={classes.filters__btnMore} onClick={onClickMore}>
                {isOpen ? <><IconWrapper Icon={ScreenNormalIcon}/> Contract filters</>
                    : <><IconWrapper Icon={ScreenFullIcon}/> Expand filters</>}
            </Button>
            <Button type={"primary"} onClick={onSubmit}><IconWrapper Icon={SearchIcon}/> Find</Button>
            <Button type={"danger"} onClick={reset}><IconWrapper Icon={XIcon}/> Reset filters</Button>
        </form>
    </BlockShadow>
}


function getHandlers(setParams: <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void) {
    return {
        setUsername: (e: ChangeEvent<HTMLInputElement>) => {
            setParams("username", e.target.value);
        },
        setRepoName: (e: ChangeEvent<HTMLInputElement>) => {
            setParams("repo", e.target.value);
        },
        onSubmitForm: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
        },
    };
}


export default ReposFilters;
