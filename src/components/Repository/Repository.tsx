import {IRepository} from "../../models/IRepository";
import {FC, memo} from "react";
import {ReactComponent as Icon} from "./../../assets/icons/link.svg";
import Languages from "./RepositoryParts/Languages";
import Contributors from "./RepositoryParts/Contributors/Contributors";
import Commits from "./RepositoryParts/Commits&Events/Commits";
import Events from "./RepositoryParts/Commits&Events/Events";
import BlockShadow from "../utils/BlockShadow/BlockShadow";
import Title from "../utils/Title/Title";
import Owner from "./RepositoryParts/Owner/Owner";
import Button from "../utils/Button/Button";
import Pulls from "./RepositoryParts/Issues&Pulls/Pulls";
import Issues from "./RepositoryParts/Issues&Pulls/Issues";
import classes from "./Repository.module.scss";

interface PropsType {
    repository: IRepository
}


const Repository: FC<PropsType> = memo(({repository}) => {
    const btnHandler = () => navigator.clipboard.writeText(repository.clone_url);
    const createdDate = new Date(repository.created_at);
    const updateDate = new Date(repository.updated_at);

    return (
        <BlockShadow className={classes.repository}>
            <Title level={2}>
                Repository {repository.name} {" "}
                <a href={repository.html_url} target="_blank" rel="noopener"
                   className={classes.repository__titleLinkIcon}>
                    <Icon/>
                </a> {" "}
                in detail
            </Title>
            <div className={classes.statistics}>
                <table className={classes.statistics__main}>
                    <tbody>
                    <tr className={classes.statistics__mainItem}>
                        <td>Stargazers count:</td>
                        <td className={classes.statistics__mainValue}>{repository.stargazers_count}</td>
                    </tr>
                    <tr className={classes.statistics__mainItem}>
                        <td>Watchers count:</td>
                        <td className={classes.statistics__mainValue}>{repository.watchers_count}</td>
                    </tr>
                    <tr className={classes.statistics__mainItem}>
                        <td>Forks count:</td>
                        <td className={classes.statistics__mainValue}>{repository.forks_count}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={classes.statistics__addInfo}>
                    <div>
                        Description: {repository.description}
                    </div>
                    <div>
                        Created at: {createdDate.toLocaleDateString()}
                    </div>
                    <div>
                        Updated at: {updateDate.toLocaleDateString()}
                    </div>

                    <div>
                        Is fork: {String(repository.fork)}
                    </div>
                    <Button onClick={btnHandler}>Copy clone url</Button>
                </div>
                <div>
                    {repository.owner && <>
                        <Owner owner={repository.owner}/>
                        <Languages owner={repository.owner.login} repo={repository.name}/>
                        <Contributors owner={repository.owner.login} repo={repository.name}/>
                        <Events owner={repository.owner.login} repo={repository.name}/>
                        <Commits owner={repository.owner.login} repo={repository.name}/>
                        <Pulls owner={repository.owner.login} repo={repository.name}/>
                        <Issues owner={repository.owner.login} repo={repository.name}/>
                    </>
                    }
                </div>
            </div>
        </BlockShadow>
    );
});

export default Repository;
