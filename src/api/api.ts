import axios, {AxiosInstance} from 'axios';
import {IUser} from "../models/IUser";

import {Octokit} from "octokit";


const octokit = new Octokit();

const instance = (): AxiosInstance => axios.create({
    baseURL: `https://api.github.com/`,
});
export const userAPI = {
    getUser(login: string) {
        return instance().get<IUser>(`users/${login}`)
    }
}

export const reposAPI = {
    getRepsByUser(username: string) {
        return octokit.rest.repos.listForUser({
            username
        });
    },

    fetchLanguages(owner: string, repo: string) {
        return octokit.rest.repos.listLanguages({
            owner,
            repo,
        });
    }
}
