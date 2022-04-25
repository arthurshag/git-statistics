import {octokit} from "./api";
import {IContributors} from "../models/IContributors";
import {reposAPI} from "./apiReposForQuery";
import {ILanguage} from "../models/ILanguage";
import {IRepository, ParamsSearchReposType} from "../models/IRepository";
import {ICommits} from "../models/ICommits";
import {IEvents} from "../models/IEvents";

export const usersAPI = {
    async getUser(params: { username: string }) {
        return octokit.rest.users.getByUsername(params);
    },
    async getUserContributors({repos, user}: { repos: { owner: string, repo: string }[], user: string }) {
        const contributorsObj: { [key: string]: IContributors[0] & { count: number } } = {};
        for (const repo of repos) {
            const {data} = await reposAPI.getContributors(repo);
            data.forEach((e) => {
                if (!e.login || e.login === user)
                    return;
                if (!contributorsObj[e.login])
                    contributorsObj[e.login] = {...e, count: 1};
                else
                    contributorsObj[e.login].count++;
            })
        }

        const contributors = Object.values(contributorsObj).sort((a, b) => -a.count + b.count);
        return {data: contributors};
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
    async getAllUserCommitsForLastYear(repos: { owner: string, repo: string }[]) {
        const response: { data: ICommits } = {data: []};
        const todayYearAgo = new Date();
        todayYearAgo.setFullYear(todayYearAgo.getFullYear() - 1);
        const dateIsoString = todayYearAgo.toISOString();
        for (const repo of repos) {
            const iterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, {
                owner: repo.owner,
                repo: repo.repo,
                since: dateIsoString,
                per_page: 100
            });

            for await (const resp of iterator) {
                response.data.push(...resp.data);
            }
        }

        return response;
    },
    async getEvents({
                        username,
                        countToTake = 500
                    }: { username: string, countToTake?: 100 | 200 | 300 | 400 | 500 | "all" }) {
        const response: { data: IEvents } = {data: []};

        const iterator = octokit.paginate.iterator(octokit.rest.activity.listPublicEventsForUser, {
            username,
            per_page: 100
        });

        let i = 0;
        for await (const resp of iterator) {
            response.data.push(...resp.data);
            i++;
            if (i * 100 === countToTake)
                break;
        }

        return response;
    }
}
