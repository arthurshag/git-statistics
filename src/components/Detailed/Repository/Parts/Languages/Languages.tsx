import React, {FC} from 'react';
import Languages from "../../../Parts/Languages/Languages";
import {useGetLanguagesQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";

interface IProps {
    owner: string,
    repo: string
}

const LanguagesContainer: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});
    return (
        <Languages data={data} error={error as string | null | undefined} isLoading={isLoading}
                   label={"Number of rows in the repository"}/>
    );
};


export default LanguagesContainer;
