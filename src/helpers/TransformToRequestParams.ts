import {ReposUrlParamsType} from "./hooks/useReposFilterParams";
import {ParamsSearchReposType} from "../models/IRepository";

const filesPerPage = 10;

export const transformToRequestParamsRepos = (params: ReposUrlParamsType): ParamsSearchReposType => {
    const calcQ = () => {
        const {username, repo, languages, starsMin, starsMax} = params;
        const qArray: string[] = [];
        if (username)
            qArray.push(`user:${params.username}`)
        if (repo)
            qArray.push(`${repo} in:name`);
        if (languages) {
            const languagesQ = languages.split(" ")
                .map(language => `language:${language}`)
                .join(" ");
            qArray.push(languagesQ);
        }
        if (starsMin && starsMax) {
            qArray.push(`stars:${starsMin}..${starsMax}`);
        } else if (starsMin) {
            qArray.push(`stars:>=${starsMin}`);
        } else if (starsMax) {
            qArray.push(`stars:<=${starsMax}`);
        }


        return qArray.join(" ");
    };

    return {
        q: calcQ(),
        page: +(params.page || 1),
        per_page: filesPerPage,
        sort: params.sort || undefined,
    }
}
