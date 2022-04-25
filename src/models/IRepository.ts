import {Endpoints} from "@octokit/types";

export type SearchReposType = Endpoints["GET /search/repositories"]["response"]["data"];
export type ParamsSearchReposType = Endpoints["GET /search/repositories"]["parameters"];
export type RepositoryType = SearchReposType["items"][number]

export interface IRepository extends RepositoryType {}