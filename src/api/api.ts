import {Octokit} from "octokit";

let octokit = new Octokit({
    auth: localStorage.getItem("access_token")
});

export const userAPI = {
    async getUser(login: string) {
        return await octokit.rest.users.getByUsername({username: login})
    },
    async getCurrent() {
        return (await octokit.request("GET /user")).data;
    }
}

export const reposAPI = {
    async fetchLanguages(owner: string, repo: string) {
        return (await octokit.rest.repos.listLanguages({
            owner,
            repo,
        })).data;
    },
    async getLanguages(owner: string, repo: string) {
        return (await octokit.rest.repos.listLanguages({
            owner,
            repo,
        })).data;
    },
    async getContributors(owner: string, repo: string) {
        return (await octokit.rest.repos.listContributors({
            owner,
            repo,
        })).data;
    },

}

export const auth = {
    setAccessToken(access_token: string) {
        localStorage.setItem("access_token", access_token)
        octokit = new Octokit({auth: access_token});
    }
}
