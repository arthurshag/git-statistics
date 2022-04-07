import {IRepository} from "../../models/IRepository";
import {FC, memo} from "react";
import Languages from "./RepositoryParts/Languages";
import Owner from "./RepositoryParts/Owner";
import classes from "./Repository.module.scss";
import Contributors from "./RepositoryParts/Contributors";
import Commits from "./RepositoryParts/Commits";
import Events from "./RepositoryParts/Events";

interface PropsType {
    repository: IRepository
}


const Repository: FC<PropsType> = memo(({repository}) => {
    const btnHandler = () => navigator.clipboard.writeText(repository.clone_url);
    return (
        <section className={classes.repository}>
            <h2>Repository in detail</h2>
            <Owner owner={repository.owner}/>
            <section className={classes.repository__statsWrapper}>
                <h3>Statistics</h3>
                <div className={classes.repository__statsWrapperData}>
                    <div>
                        <a href={repository.html_url}>Open Repository in github</a>
                    </div>
                    <div>
                        Forks_count: {repository.forks_count}
                    </div>
                    <div>
                        Topics {repository.topics?.join(", ")}
                    </div>
                    <div>
                        Watchers count: {repository.watchers_count}
                    </div>
                    <div>
                        Stargazers_count: {repository.stargazers_count}
                    </div>
                    <div>
                        Description: {repository.description}
                    </div>
                    <div>
                        Created_at: {repository.created_at}
                    </div>
                    <div>
                        Updated_at: {repository.updated_at}
                    </div>
                    <button onClick={btnHandler}>
                        Clone url: {repository.clone_url} (onclick copy)
                    </button>
                    <div>
                        <Languages owner={repository.owner.login} repo={repository.name}/>
                    </div>
                    <div>
                        <Contributors owner={repository.owner.login} repo={repository.name}/>
                    </div>
                    <div >
                        <Events owner={repository.owner.login} repo={repository.name}/>
                    </div>
                    <div >
                        <Commits owner={repository.owner.login} repo={repository.name}/>
                    </div>
                </div>
            </section>
        </section>
    );
});

export default Repository;
