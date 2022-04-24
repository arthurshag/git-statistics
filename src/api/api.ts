import axios, {AxiosInstance} from 'axios';
import {IUser} from "../models/IUser";
import {Octokit} from "octokit";

export let octokit = new Octokit({
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

export const auth = {
    setAccessToken(access_token: string) {
        localStorage.setItem("access_token", access_token)
        octokit = new Octokit({auth: access_token});
    },
    removeAccessToken() {
        localStorage.removeItem("access_token")
        octokit = new Octokit();
    }
}
