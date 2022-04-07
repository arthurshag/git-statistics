import {Octokit} from "octokit";
import {Endpoints} from "@octokit/types";
import {ICommits} from "../models/ICommits";
import {ParamsSearchReposType} from "../models/IRepository";

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
    async fetchLanguages({owner, repo}: { owner: string, repo: string }) {
        return (await octokit.rest.repos.listLanguages({
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
    async getEvents({owner, repo}: { owner: string, repo: string }) {
        return (await octokit.request("GET /repos/{owner}/{repo}/events", {
            owner,
            repo,
        }));
    },
    async getAllCommits({owner, repo}: { owner: string, repo: string }) {
        const iterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, {
            owner,
            repo,
            per_page: 100
        });

        const response: { data: ICommits } = {data: []};
      
        for await (const resp of iterator) {
            response.data.push(...resp.data);
            //todo: remove
            break;
        }

        return response;
    },
}
