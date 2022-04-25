import {Endpoints} from "@octokit/types";

type CollaboratorsType = Endpoints["GET /repos/{owner}/{repo}/collaborators"]["response"]["data"];

export interface ICollaborators extends CollaboratorsType {
}
