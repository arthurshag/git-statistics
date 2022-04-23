import {FC, memo} from "react";
import BlockShadow from "../../utils/BlockShadow/BlockShadow";
import Title from "../../utils/Title/Title";
import {ReactComponent as Icon} from "./../../../assets/icons/link.svg";
import {IRepository} from "../../../models/IRepository";
import Owner from "./Parts/Owner/Owner";
import Contributors from "./Parts/Contributors/Contributors";
import Pulls from "./Parts/Issues&Pulls/Pulls";
import Issues from "./Parts/Issues&Pulls/Issues";
import Button from "../../utils/Button/Button";
import classes from "./Repository.module.scss";
import CommitsContainer from "./Parts/Commits/Commits";
import Events from "./Parts/Events/Events";
import LanguagesContainer from "./Parts/Languages/Languages";

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
                        <LanguagesContainer owner={repository.owner.login} repo={repository.name}/>
                        <Contributors owner={repository.owner.login} repo={repository.name}/>
                        <Events owner={repository.owner.login} repo={repository.name}/>
                        <CommitsContainer owner={repository.owner.login} repo={repository.name}/>
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
