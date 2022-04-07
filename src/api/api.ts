import axios, {AxiosInstance} from 'axios';
import {IUser} from "../models/IUser";
import {Octokit} from "octokit";
import {Endpoints} from "@octokit/types";

let octokit = new Octokit({
    auth: localStorage.getItem("access_token")
});

const instance = (): AxiosInstance => axios.create({
    baseURL: `https://api.github.com/`,
});

export const userAPI = {
    async getUser(login: string) {
        return await instance().get<IUser>(`users/${login}`)
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
