import {Endpoints} from "@octokit/types";

type PullsType = Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

export interface IPulls extends PullsType {
}
