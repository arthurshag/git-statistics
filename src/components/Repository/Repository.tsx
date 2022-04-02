import {IRepository} from "../../models/IRepository";
import {FC, memo} from "react";
import Languages from "./RepositoryParts/Languages";
import Contributors from "./RepositoryParts/Contributors";

interface PropsType {
    repository: IRepository
}

const Repository: FC<PropsType> = memo(({repository}) => {
    return (
        <section>
            <h2>Repository in detail</h2>
            <div>
                {repository.owner.login} {repository.owner.name}
            </div>
            <div>
                {repository.html_url}
            </div>
            <div>
                {repository.forks_count}
            </div>
            <div>
                {repository.topics?.join(", ")}
            </div>
            <div>
                {repository.watchers_count}
            </div>
            <div>
                {repository.stargazers_count}
            </div>
            <div>
                {repository.description}
            </div>
            <div>
                {repository.created_at}
            </div>
            <div>
                {repository.updated_at}
            </div>
            <div>
                {repository.clone_url}
            </div>
            <div>
                <Languages owner={repository.owner.login} repo={repository.name}/>
            </div>
            <div>
                <Languages owner={repository.owner.login} repo={repository.name}/>
            </div>
            <div>
                <Contributors owner={repository.owner.login} repo={repository.name}/>
            </div>
        </section>
    );
});

export default Repository;
