import React, {ChangeEvent, FC, FormEvent, memo, useMemo, useState} from "react";
import {ReposUrlParamsType} from "../../../helpers/hooks/useReposFilterParams";
import TextInput from "../../utils/TextInput/TextInput";
import BlockShadow from "../../utils/BlockShadow/BlockShadow";
import Button from "../../utils/Button/Button";
import ReposAddFilters from "./ReposAddFilters";
import IconWrapper from "../../utils/IconWrapper/IconWrapper";
import {ScreenFullIcon, ScreenNormalIcon, SearchIcon, XIcon} from "@primer/octicons-react";
import LoadingDefault from "../../utils/Loading/LoadingDefault";
import classes from "./ReposFilters.module.scss";

interface IFilters {
    params: ReposUrlParamsType,
    setParams: <T extends keyof ReposUrlParamsType>(field: T, value: ReposUrlParamsType[T]) => void,
    reset: () => void,
    onSubmit: () => void,
    isFetching: boolean
}

const ReposFilters: FC<IFilters> = memo(({
                                             params,
                                             reset,
                                             setParams,
                                             onSubmit,
                                             isFetching
                                         }) => {

    const [isOpen, setIsOpen] = useState(false);
    const {setRepoName, onSubmitForm, setUsername} = useMemo(() => getHandlers(setParams), [setParams]);
    const onClickMore = () => setIsOpen((prev) => !prev);

    return <BlockShadow className={classes.filters}>
        <form onSubmit={onSubmitForm} className={classes.filters__form}>
            <div className={classes.filters__mainFilters}>
                <TextInput placeholder={"Repo name"} value={params.repo || ""} onChange={setRepoName}
                           onPressEnter={onSubmit}/>
                <span>/</span>
                <TextInput placeholder={"Login user"} value={params.username || ""} onChange={setUsername}
                           onPressEnter={onSubmit}/>
                <Button type={"danger"} onClick={reset}><IconWrapper Icon={XIcon}/></Button>
                <Button type={"default"} className={classes.filters__btnMore} onClick={onClickMore}>
                    {isOpen ? <><IconWrapper Icon={ScreenNormalIcon}/></>
                        : <><IconWrapper Icon={ScreenFullIcon}/></>}
                </Button>
                <Button type={"primary"} onClick={onSubmit} disabled={isFetching} className={classes.filters__btnFind}>
                    <LoadingDefault isLoading={isFetching} className={classes.filters__loading}>
                        <IconWrapper Icon={SearchIcon}/>
                    </LoadingDefault>
                </Button>
            </div>
            {isOpen && <ReposAddFilters params={params} setParams={setParams}/>}
        </form>
    </BlockShadow>
})


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
