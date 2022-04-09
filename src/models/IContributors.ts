import {Endpoints} from "@octokit/types";

type ContributorsType = Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"];

export interface IContributors extends ContributorsType {}
