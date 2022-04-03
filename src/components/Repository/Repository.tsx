import {IRepository} from "../../models/IRepository";
import {FC, memo} from "react";
import Languages from "./RepositoryParts/Languages";
import Contributors from "./RepositoryParts/Contributors";
import Owner from "./RepositoryParts/Owner";
import Events from "./RepositoryParts/Events";
import Commits from "./RepositoryParts/Commits";

interface PropsType {
    repository: IRepository
}


const Repository: FC<PropsType> = memo(({repository}) => {
    const btnHandler = () => navigator.clipboard.writeText(repository.clone_url);
    return (
        <section>
            <h2>Repository in detail</h2>
            <Owner owner={repository.owner}/>
            <section>
                <div>
                    <a href={repository.html_url}>Open Repository in github</a>
                </div>
                <div>
                    forks_count: {repository.forks_count}
                </div>
                <div>
                    Topics {repository.topics?.join(", ")}
                </div>
                <div>
                    watchers_count: {repository.watchers_count}
                </div>
                <div>
                    stargazers_count: {repository.stargazers_count}
                </div>
                <div>
                    description: {repository.description}
                </div>
                <div>
                    created_at: {repository.created_at}
                </div>
                <div>
                    updated_at: {repository.updated_at}
                </div>
                <button onClick={btnHandler}>
                    clone_url: {repository.clone_url} (onclick copy)
                </button>
                <div>
                    <Languages owner={repository.owner.login} repo={repository.name}/>
                </div>
                <div>
                    {/*<Contributors owner={repository.owner.login} repo={repository.name}/>*/}
                </div>
                <div>
                    {/*<Commits owner={repository.owner.login} repo={repository.name}/>*/}
                </div>
                <div>
                    <Events owner={repository.owner.login} repo={repository.name}/>
                </div>
            </section>
        </section>
    );
});

export default Repository;
