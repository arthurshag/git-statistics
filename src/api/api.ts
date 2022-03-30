import axios, {AxiosInstance} from 'axios';
import {IUser} from "../models/IUser";

import {Octokit} from "octokit";


const octokit = new Octokit();

const instance = (): AxiosInstance => axios.create({
    baseURL: `https://api.github.com/`,
});
export const userAPI = {
    async getUser(login: string) {
        return await instance().get<IUser>(`users/${login}`)
    }
}

export const reposAPI = {
    async getRepsByUser(username: string) {
        return (await (octokit.rest.repos.listForUser({
            username
        }))).data;
    },

    async fetchLanguages(owner: string, repo: string) {
        return (await octokit.rest.repos.listLanguages({
            owner,
            repo,
        })).data;
    }
}
