import {FC, memo} from "react";
import BlockShadow from "../../utils/BlockShadow/BlockShadow";
import Title from "../../utils/Title/Title";
import {IRepository} from "../../../models/IRepository";
import Contributors from "./Parts/Contributors/Contributors";
import Pulls from "./Parts/Issues&Pulls/Pulls";
import Issues from "./Parts/Issues&Pulls/Issues";
import CommitsContainer from "./Parts/Commits/Commits";
import Events from "./Parts/Events/Events";
import LanguagesContainer from "./Parts/Languages/Languages";
import Profile from "../Parts/Profile/Profile";
import MainStatistics from "./Parts/MainStatistics/MainStatistics";
import classes from "./Repository.module.scss";
import LinkGit from "../../utils/LinkGit/LinkGit";
import IconWrapper from "../../utils/IconWrapper/IconWrapper";
import {RepoIcon} from "@primer/octicons-react";

interface PropsType {
    repository: IRepository
}

const Repository: FC<PropsType> = memo(({repository}) => {
    return (
        <BlockShadow className={classes.repository}>
            <Title level={2}>
                <IconWrapper Icon={RepoIcon}/> Repository {repository.name} {" "}
                <LinkGit githubUrl={repository.html_url}/> {" "}
                in detail
            </Title>
            <div>
                <MainStatistics repository={repository}/>
                <div className={classes.repository__charts}>
                    {repository.owner && <>
                    <Profile username={repository.owner.login} title={"Owner"}/>
                    <div className={classes.repository__languagesEvents}>
                        <LanguagesContainer owner={repository.owner.login} repo={repository.name}/>
                        <Events owner={repository.owner.login} repo={repository.name}/>
                    </div>
                    <Contributors owner={repository.owner.login} repo={repository.name}/>
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
