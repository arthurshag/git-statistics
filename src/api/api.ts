import axios, {AxiosInstance} from 'axios';
import {IUser} from "../models/IUser";
import {ILanguage} from "../models/ILanguage";
import {IRepository} from "../models/IRepository";

const instance = (): AxiosInstance => axios.create({
    baseURL: `https://api.github.com/`,
});

export const userAPI = {
    getUser(login: string) {
        return instance().get<IUser>(`users/${login}`)
    }
}


export const reposAPI = {
    getRepsByUser(login: string) {
        return instance().get<Array<IRepository>>(`/users/${login}/repos`)
    },

    fetchLanguages(full_name: string) {
        return instance().get<ILanguage>(`/repos/${full_name}/languages`);
    }
}
