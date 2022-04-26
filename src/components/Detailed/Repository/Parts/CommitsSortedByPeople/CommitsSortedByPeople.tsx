import React, {FC} from 'react';
import {useGetAllCommitsQuery} from "../../../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import Title from "../../../../utils/Title/Title";
import IconWrapper from "../../../../utils/IconWrapper/IconWrapper";
import {GraphIcon} from "@primer/octicons-react";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import BarChart from "../../../Parts/Charts/BarChart/BarChart";

interface IProps {
    owner: string,
    repo: string
}

// если эти 3 строки внутри commits, то начинается бесконечный ререндер компоненты и запросы на коммиты
const todayYearAgo = new Date();
todayYearAgo.setFullYear(todayYearAgo.getFullYear() - 1);
const dateIsoString = todayYearAgo.toISOString();

const CommitsSortedByPeople: FC<IProps> = ({owner, repo}) => {
    const {data: serverData, error, isLoading} = useGetAllCommitsQuery({
        owner: owner,
        repo: repo,
        since: dateIsoString
    });
    const data = serverData?.reduce((filtered, current) => {
        if (!current.author)
            return filtered;
        if (filtered[current.author.login]) {
            filtered[current.author.login]++;
        } else {
            filtered[current.author.login] = 1;
        }
        return filtered;
    }, {} as { [key: string]: number });

    return (
        <>
            <Title level={3}><IconWrapper Icon={GraphIcon}/> People contributions </Title>
            <Loading isLoading={isLoading}>
                <ErrorGate error={error as string | null | undefined}>
                    {data && <BarChart legend={["User", "Commits"]} dataChart={Object.entries(data)}
                                       />}
                </ErrorGate>
            </Loading>
        </>
    );
};


export default CommitsSortedByPeople;
