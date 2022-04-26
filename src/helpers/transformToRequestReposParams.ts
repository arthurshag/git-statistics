import {ReposUrlParamsType} from "./hooks/useReposFilterParams";
import {ParamsSearchReposType} from "../models/IRepository";

export const transformToRequestReposParams = (params: ReposUrlParamsType): ParamsSearchReposType => {
    const {page, sort, filesPerPage} = params;

    return {
        q: calcQ(params),
        page: +(page || 1),
        per_page: +filesPerPage,
        sort: sort || undefined,
    }
}

const calcQ = ({
                   username, repo, pushedFrom, pushedTo, createdFrom, createdTo, starsMax,
                   languages, starsMin
               }: ReposUrlParamsType) => {
    const qArray: string[] = [];
    if (username)
        qArray.push(`user:${username}`)
    if (repo)
        qArray.push(`${repo} in:name`);
    if (languages) {
        const languagesQ = languages.split(" ")
            .map(language => `language:${language}`)
            .join(" ");
        qArray.push(languagesQ);
    }

    if (starsMin || starsMax) {
        qArray.push(`stars:${calcQArrange(starsMin, starsMax)}`);
    }

    if (pushedFrom || pushedTo) {
        qArray.push(`pushed:${calcQArrange(pushedFrom, pushedTo)}`);
    }

    if (createdTo || createdFrom) {
        qArray.push(`created:${calcQArrange(createdFrom, createdTo)}`);
    }

    return qArray.join(" ");
};


const calcQArrange = (from: string | undefined | null, to: string | undefined | null) => {
    if (from && to) {
        return (`${from}..${to}`);
    } else if (from) {
        return (`>=${from}`);
    } else if (to) {
        return (`<=${to}`);
    }

    return "";
}
