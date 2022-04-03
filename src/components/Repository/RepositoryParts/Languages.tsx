import React, {FC} from 'react';
import {useGetLanguagesQuery} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";

interface IProps {
    owner: string,
    repo: string
}

const Languages:FC<IProps> = ({owner, repo }) => {
    const {data, error, isLoading} = useGetLanguagesQuery({owner: owner, repo: repo});
    const UILanguages = data && Object.keys(data).map((language) => {
        return <div key={language}>{language}: {data[language]}</div>
    })
    return (
        <div>
            <h3>Languages</h3>
            {UILanguages}
        </div>
    );
};


export default Languages;
