import React, {FC} from 'react';
import {useAppSelector} from "../../hooks/reduxHooks";
import Repositories from "./Repositories";

const RepositoriesContainer: FC = () => {
    const repositories = useAppSelector(state => state.repositoriesReducer.repositories);
    const isLoadingReps = useAppSelector(state => state.repositoriesReducer.isLoading);
    const repsError = useAppSelector(state => state.repositoriesReducer.error);

    return (
        <>
            {isLoadingReps && "Loading..."}
            {!!repsError && repsError}
            {!!repositories?.length && <Repositories repositories={repositories}/>}
        </>
    );
};

export default RepositoriesContainer;
