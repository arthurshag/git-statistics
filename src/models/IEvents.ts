import {Endpoints} from "@octokit/types";

type RepoEventsType = Endpoints["GET /repos/{owner}/{repo}/events"]["response"]["data"];

export interface IEvents extends RepoEventsType {
}
