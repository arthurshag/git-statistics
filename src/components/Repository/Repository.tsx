import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {fetchRepo} from "../../redux/reducers/RepositoryReducer/ActionCreators";
import Repository from "../Repositories/Repository";

const RepositoryDetailed: FC = (props) => {
    const params = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (params.owner && params.repo)
            dispatch(fetchRepo(params.owner, params.repo));
    }, [])

    const repository = useAppSelector((state) => state.repoReducer.repository);
    console.log(repository);
    if (repository === null) {
        return <div>
            {params.owner}
            {params.repo}
        </div>
    }
    return (
        <div>
            <Repository {...repository}/>
        </div>
    );
};


export default RepositoryDetailed;
