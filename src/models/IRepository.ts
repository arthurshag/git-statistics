import {Endpoints} from "@octokit/types";

export type TypeListUserReposData = Endpoints["GET /users/{username}/repos"]["response"]["data"];
export type TypeServerRepository = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export interface IServerRepositoryWithLanguages extends TypeServerRepository{
    languages: { [key: string]: number } | null
}

type TypeNeededFields =
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

export type TypeRepository = Pick<TypeServerRepository, TypeNeededFields>



export interface IRepository extends TypeRepository{
    languages: { [key: string]: number } | null
}
