import {Endpoints} from "@octokit/types";

type IssuesType = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

export interface IIssues extends IssuesType {
}
