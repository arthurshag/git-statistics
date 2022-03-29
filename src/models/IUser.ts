import {IRepository} from "./IRepository";

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
    repositories: undefined | null | IRepository[]
}
