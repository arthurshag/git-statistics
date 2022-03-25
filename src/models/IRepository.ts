export interface IRepository {
    id: number,
    name: string,
    owner: {
        login:string,
        avatar_url:string,
        html_url:string
    },
    html_url: string
    description: string,
    forks_count: number,
    watchers_count: number,
    topics: string[],
    clone_url: string,
    created_at: string,
    updated_at: string,
    stargazers_count: number,
    language: string,
    languages: {[key: string]: number}
}
