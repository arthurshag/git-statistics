import axios, { AxiosInstance} from 'axios';
import {IUser} from "../models/IUser";

const instance = (): AxiosInstance => axios.create({
    baseURL: `https://api.github.com/`,
});

export const userAPI = {
    getUser(login: string){
        return instance().get<IUser>(`users/${login}`)
    }
}
