import {Endpoints} from "@octokit/types";

export type ListUserReposType = Endpoints["GET /users/{username}/repos"]["response"]["data"];
export type ServerRepositoryType = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
export type LanguageType = Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];

export interface IServerRepositoryWithLanguages extends ServerRepositoryType {
    languages: LanguageType
}

type NeededFieldsType =
    "id"
    | "name"
    | "full_name"
    | "owner"
    | "html_url"
    | "description"
    | "forks_count"
    | "watchers_count"
    | "topics"
    | "clone_url"
    | "created_at"
    | "updated_at"
    | "stargazers_count"
    | "language";

export type RepositoryType = Pick<ServerRepositoryType, NeededFieldsType>

export interface IRepository extends RepositoryType {
    languages?: LanguageType
}

type asd = Endpoints["GET /events"]
