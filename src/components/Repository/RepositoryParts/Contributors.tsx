import React, {FC, useEffect, useState} from 'react';
import {useFetching} from "../../../utils/hooks/useFetching";
import {reposAPI} from "../../../api/api";
import {ILanguage} from "../../../models/ILanguage";
import {IContributors} from "../../../models/IContributors";

interface IProps {
    owner: string,
    repo: string
}

const Contributors:FC<IProps> = ({owner, repo }) => {
    const [state, setState] = useState<null | IContributors>(null);
    const [fetching, isLoading, error] = useFetching(async (owner: string, repo: string) => {
        const response = await reposAPI.getContributors(owner, repo);
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


export default Contributors;
