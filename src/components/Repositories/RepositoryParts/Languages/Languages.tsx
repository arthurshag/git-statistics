import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";
import classes from "./Languages.module.scss";
import classNames from "classnames";

interface IProps {
    owner: string,
    repo: string,
    className?: string
}

const Languages: FC<IProps> = ({owner, repo, className}) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});

    const values = data && Object.keys(data).map((key, i) => {
        return <Language key={key} language={key} count={data[key]} id={i}/>
    })

    return (
        <div className={classNames(classes.languages, className)}>
            <div className={classes.languages__title}>Languages:</div>
            {" "}
            <Loading className={classes.loading} isLoading={isLoading}>
                <ErrorGate error={error as string | null | undefined}>
                    {values}
                </ErrorGate>
            </Loading>
        </div>
    );
};

const colorsLanguage = ["yellow", "green", "red"];
const Language: FC<{ language: string, count: number, id: number }> = ({language, count, id}) => {
    const index = id % (colorsLanguage.length + 1);
    return <div
        className={classNames(classes.language, classes[`language_${colorsLanguage[index]}`])}>
        {language}
        <span className={classes.language__count}>{count}</span>
    </div>
}


export default Languages;
