import React, {FC, memo} from "react";
import Button from "../../../../utils/Button/Button";
import {IRepository} from "../../../../../models/IRepository";
import {CopyIcon, EyeIcon, RepoForkedIcon, StarFillIcon} from "@primer/octicons-react";
import IconWrapper from "../../../../utils/IconWrapper/IconWrapper";
import classes from "./MainStatistics.module.scss";

interface PropsType {
    repository: IRepository
}


const MainStatistics: FC<PropsType> = memo(({repository}) => {
    const btnHandler = () => navigator.clipboard.writeText(repository.clone_url);
    const createdDate = new Date(repository.created_at);
    const updateDate = new Date(repository.updated_at);

    return (
        <>
            <table className={classes.statistics__main}>
                <tbody>
                <tr className={classes.statistics__mainItem}>
                    <td><IconWrapper Icon={StarFillIcon}/> Stars:</td>
                    <td className={classes.statistics__mainValue}>
                        {repository.stargazers_count}
                    </td>
                </tr>
                <tr className={classes.statistics__mainItem}>
                    <td><IconWrapper Icon={EyeIcon}/> Watchers:</td>
                    <td className={classes.statistics__mainValue}>
                        {repository.watchers_count}
                    </td>
                </tr>
                <tr className={classes.statistics__mainItem}>
                    <td><IconWrapper Icon={RepoForkedIcon}/> Forks:</td>
                    <td className={classes.statistics__mainValue}>
                        {repository.forks_count}
                    </td>
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
                <Button onClick={btnHandler} className={classes.statistics__cloneUrl}><IconWrapper
                    Icon={CopyIcon}/> Copy clone url</Button>
            </div>
        </>
    );
});

export default MainStatistics;
