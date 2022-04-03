import React, {FC} from 'react';
import {
    useGetAllCommitsQuery,
} from "../../../redux/reducers/RepositoryReducer/RepositoryRTK";
import {Endpoints} from "@octokit/types";

interface IProps {
    owner: string,
    repo: string
}

const Commits: FC<IProps> = ({owner, repo}) => {
    const {data, error, isLoading} = useGetAllCommitsQuery({owner: owner, repo: repo});
    if (!data)
        return null;

    const options = getOptions(data);
    const ui = options.map((e) => {
        return <div style={{display: "flex", gap: 10}}>
            <div>{e.date.toLocaleDateString()}</div>
            <div>{e.value}</div>
        </div>
    })


    return (
        <div>
            Commits last 100:
            <div style={{display: "flex", gap: 10}}>
                {ui}
            </div>
        </div>
    );
};


const getOptions = (data: Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"]) => {
    let options: {date: Date, value: number}[] = [];
    data.forEach(({commit}) => {
        const {committer} = commit;
        const created_at = committer?.date;
        if (created_at) {
            const date1 = new Date(created_at);
            date1.setHours(0, 0, 0, 0);
            const index = options.findIndex((e) => {
                return +e.date === +date1;
            });
            if (index >= 0) {
                options[index].value++;
            } else {
                options.push({date: date1, value: 1});
            }
        }
    })
    return options;
}

export default Commits;
