import {octokit} from "./api";
import {IContributors} from "../models/IContributors";
import {reposAPI} from "./apiReposForQuery";
import {ILanguage} from "../models/ILanguage";
import {IRepository, ParamsSearchReposType} from "../models/IRepository";
import {ICommits} from "../models/ICommits";

export const usersAPI = {
    async getUser(params: { username: string }) {
        return octokit.rest.users.getByUsername(params);
    },
    async getUserContributors(repos: { owner: string, repo: string }[]) {
        const obj: { [key: string]: IContributors[0] & { count: number } } = {};
        for (const repo of repos) {
            const {data} = await reposAPI.getContributors(repo);
            data.forEach((e) => {
                if (!e.login)
                    return;
                if (!obj[e.login])
                    obj[e.login] = {...e, count: 1};
                else
                    obj[e.login].count++;
            })
        }

        return {data: obj};
    },
    async getAllRepos(params: Omit<ParamsSearchReposType, "per_page" | "page">) {
        const iterator = octokit.paginate.iterator(octokit.rest.search.repos, {
            ...params,
            per_page: 100
        });

        const response: { data: IRepository[] } = {data: []};
        for await (const {data} of iterator) {
            response.data.push(...data);
        }

        return response;
    },
    async getUserLanguages(repos: { owner: string, repo: string }[]) {
        const languages: ILanguage = {};
        for (const repo of repos) {
            const {data} = await reposAPI.getLanguages(repo);
            Object.entries(data).forEach(([key, value]) => {
                if (!languages[key])
                    languages[key] = value;
                else
                    languages[key] += value;
            })
        }

        return {data: languages};
    },
    async getAllUserCommits(repos: { owner: string, repo: string }[]) {
        const response: { data: ICommits } = {data: []};
        for (const repo of repos) {
            const iterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, {
                owner: repo.owner,
                repo: repo.repo,
                per_page: 100
            });

            for await (const resp of iterator) {
                response.data.push(...resp.data);
            }
        }

        return response;
    },
}
