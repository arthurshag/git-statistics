import {IRepository} from "./IRepository";
import {Endpoints} from "@octokit/types";

export interface IUser {
    avatar_url: string,
    bio: string,
    blog: string,
    email: string | null,
    followers: number,
    following: number,
    location: string | null,
    login: string,
    name: string,
    public_repos: number,
    repositories?: undefined | null | IRepository[]
}

export interface IUserWithLoading extends IUser{
    isLoading: boolean,
    error: string | null
}

export type UserGitType = Endpoints["GET /user"]["response"]["data"];
// интерфейс не дает создать
