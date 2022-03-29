import React, {FC} from 'react';
import {useAppSelector} from "../../redux/hooks/reduxHooks";
import Repositories from "./Repositories";

const RepositoriesContainer: FC = () => {
    const repositories = useAppSelector(state => state.userReducer.user.repositories);
    const isLoadingReps = useAppSelector(state => state.userReducer.isLoading);

    return (
        <>
            {isLoadingReps
                ? "Loading..."
                : repositories && <Repositories repositories={repositories}/>
            }
        </>
    );
};

export default RepositoriesContainer;
