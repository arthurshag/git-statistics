import {Endpoints} from "@octokit/types";

type CommitsType = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

export interface ICommits extends CommitsType {}
