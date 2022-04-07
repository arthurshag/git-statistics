import {Endpoints} from "@octokit/types";

type LanguageType = Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];

export interface ILanguage extends LanguageType {}
