import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../utils/hooks/useFetching";
import {IRepository} from "../../models/IRepository";
import {reposAPI} from "../../api/api";
import Repository from "./Repository";

const RepositoryDetailed: FC = (props) => {
    const params = useParams();
    const [repository, setState] = useState<IRepository | null>(null);
    const [fetching, isLoading, error] = useFetching(async (owner: string, repo: string) => {
        const response = await reposAPI.getRepo(owner, repo);
        setState(response);
    })
    useEffect(() => {
        if (params.owner && params.repo) {
            fetching(params.owner, params.repo);
        }
    }, [params])

    if (repository === null) {
        return <div>
            {params.owner}
            {params.repo}
        </div>
    }

    return (<Repository repository={repository}/>);
};


export default RepositoryDetailed;
