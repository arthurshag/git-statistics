import {Octokit} from "octokit";
import {Endpoints} from "@octokit/types";
import {ICommits} from "../models/ICommits";
import {ParamsSearchReposType} from "../models/IRepository";
import {IIssues} from "../models/IIssues";

let octokit = new Octokit({
    auth: localStorage.getItem("access_token")
});

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

        const response: { data: Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"] } = {data: []};
        for await (const {data} of iterator) {
            response.data.push(...data);
        }

        return response;
    },
    async getEvents({per_page = 100, ...rest}: Endpoints["GET /repos/{owner}/{repo}/events"]["parameters"]) {
        return (await octokit.request("GET /repos/{owner}/{repo}/events", {
            per_page, ...rest
        }));
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
            per_page: 100
        });
        const response: { data: Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"] } = {data: []};

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
