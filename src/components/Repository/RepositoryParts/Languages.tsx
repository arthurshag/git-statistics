import React, {FC, useEffect, useState} from 'react';
import {useFetching} from "../../../utils/hooks/useFetching";
import {reposAPI} from "../../../api/api";
import {ILanguage} from "../../../models/ILanguage";

interface IProps {
    owner: string,
    repo: string
}

const Languages:FC<IProps> = ({owner, repo }) => {
    const [state, setState] = useState<null | ILanguage>(null);
    const [fetching, isLoading, error] = useFetching(async (owner: string, repo: string) => {
        const response = await reposAPI.getLanguages(owner, repo);
        setState(response);
    })

    useEffect(() => {
        fetching(owner, repo);
    }, [owner, repo])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};


export default Languages;
