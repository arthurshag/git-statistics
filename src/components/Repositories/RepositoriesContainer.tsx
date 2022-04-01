import React, {FC} from 'react';
import {useAppSelector} from "../../redux/hooks/reduxHooks";
import Repositories from "./Repositories";

interface IProps {
    fetchReposPaginateOnClick: () => void
}

const RepositoriesPaginate: FC<IProps> = ({fetchReposPaginateOnClick}) => {
    const repositories = useAppSelector(state => state.repositoriesReducer.repositories);
    const isLoading = useAppSelector(state => state.repositoriesReducer.paginate.isLoading);
    const couldLoadMore = useAppSelector(state => state.repositoriesReducer.paginate.couldLoadMore);
    const paginateError = useAppSelector(state => state.repositoriesReducer.paginate.error);
    return (
        <div>
            {repositories?.length > 0 && <>
                <Repositories repositories={repositories}/>
                {paginateError}
                {couldLoadMore &&
                <button disabled={isLoading} onClick={fetchReposPaginateOnClick}>
                    Load more
                </button>
                }
            </>
            }
        </div>
    );
};


export default RepositoriesPaginate;
