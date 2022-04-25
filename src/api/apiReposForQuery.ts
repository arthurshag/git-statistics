import {ICommits} from "../models/ICommits";
import {ParamsSearchReposType} from "../models/IRepository";
import {octokit} from "./api";
import {ICollaborators} from "../models/ICollaborators";
import {IContributors} from "../models/IContributors";
import {Endpoints} from "@octokit/types";
import {IPulls} from "../models/IPulls";
import {IIssues} from "../models/IIssues";
import {IEvents} from "../models/IEvents";

export const reposAPI = {
    async getRepos(params: ParamsSearchReposType) {
        return octokit.rest.search.repos(params);
    },

    async getRepo({owner, repo}: { owner: string, repo: string }) {
        return (await octokit.rest.repos.get({
            owner,
            repo,
        }));
    },
    async getLanguages({owner, repo}: { owner: string, repo: string }) {
        return (await octokit.rest.repos.listLanguages({
            owner,
            repo,
        }));
    },
    async getContributors({owner, repo}: { owner: string, repo: string }) {
        const iterator = octokit.paginate.iterator(octokit.rest.repos.listContributors, {
            owner,
            repo,
            per_page: 100
        });

        const response: { data: IContributors } = {data: []};
        for await (const {data} of iterator) {
            response.data.push(...data);
        }

        return response;
    },
    async getCollaborators({owner, repo}: { owner: string, repo: string }) {
        const iterator = octokit.paginate.iterator(octokit.rest.repos.listCollaborators, {
            owner,
            repo,
            per_page: 100
        });

        const response: { data: ICollaborators } = {data: []};
        for await (const {data} of iterator) {
            response.data.push(...data);
        }

        return response;
    },
    async getEvents({
                        owner, repo, countToTake = 500
                    }: { owner: string, repo: string, countToTake?: 100 | 200 | 300 | 400 | 500 | "all" }) {
        const response: { data: IEvents } = {data: []};
        const iterator = octokit.paginate.iterator(octokit.rest.activity.listPublicEventsForRepoNetwork, {
            repo, owner,
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
    },
    async getAllCommits({per_page = 100, ...rest}: Endpoints["GET /repos/{owner}/{repo}/commits"]["parameters"]) {
        const iterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, {
            per_page, ...rest
        })

        const response: { data: ICommits } = {data: []};

        for await (const resp of iterator) {
            response.data.push(...resp.data);
        }

        return response;
    },
    async getClosedPulls(params: { owner: string, repo: string }) {
        const iterator = octokit.paginate.iterator(octokit.rest.pulls.list, {
            ...params,
            state: "closed",
            per_page: 100,
        });
        const response: { data: IPulls } = {data: []};

        for await (const resp of iterator) {
            response.data.push(...resp.data);
            break;
        }

        return response;
    },

    async getClosedIssues(params: { owner: string, repo: string }) {
        const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
            ...params,
            state: "closed",
            per_page: 100
        });
        const response: { data: IIssues } = {data: []};

        for await (const resp of iterator) {
            response.data.push(...resp.data);
            break;
        }

        return response;
    },
}
