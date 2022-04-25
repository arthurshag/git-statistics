import React, {FC} from 'react';
import Languages from "../../../Parts/Languages/Languages";
import {useLanguagesByAllRepos} from "../../../../../redux/reducers/UserReducer/useGetCommitsByAllRepos";

interface IProps {
    user: string,
}

const LanguagesContainer: FC<IProps> = ({user}) => {
    const {data, error, isLoading} = useLanguagesByAllRepos(user);
    return (
        <Languages data={data} error={error as string | null | undefined} isLoading={isLoading}
                   label={"Number of rows in the repositories"}
        />
    );
};


export default LanguagesContainer;
