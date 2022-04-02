import {Octokit} from "octokit";

let octokit = new Octokit({
    auth: localStorage.getItem("access_token")
});

export const reposAPI = {
    async getRepos({owner}: {owner: string}) {
        return (await (octokit.rest.repos.listForUser({
            username: owner
        })));
    },
    async getRepo({owner, repo}: {owner: string, repo: string}) {
        return (await octokit.rest.repos.get({
            owner,
            repo,
        }));
    },
    async fetchLanguages({owner, repo}: {owner: string, repo: string}) {
        return (await octokit.rest.repos.listLanguages({
            owner,
            repo,
        }));
    },
    async getLanguages({owner, repo}: {owner: string, repo: string}) {
        return (await octokit.rest.repos.listLanguages({
            owner,
            repo,
        }));
    },
    async getContributors({owner, repo}: {owner: string, repo: string}) {
        return (await octokit.rest.repos.listContributors({
            owner,
            repo,
        }));
    },
    async getEvents({owner, repo}: {owner: string, repo: string}) {
        return (await octokit.request("GET /repos/{owner}/{repo}/events", {
            owner,
            repo,
        }));
    },
}
