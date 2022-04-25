import React, {FC} from 'react';
import classes from "./Topics.module.scss";
import classNames from "classnames";

interface IProps {
    topics: string[],
    className?: string
}

const topicsColors = ["red", "blue", "secondary", "dark"];
const Topics: FC<IProps> = ({topics, className}) => {
    const topicsUI = topics?.map((e, i) => {
        return <div key={e}
                    className={classNames(classes.topic, classes[`topic_${topicsColors[i % (topicsColors.length + 1)]}`])}>{e}</div>
    })

    return (
        <div className={classNames(classes.topics, className)}>
            <span className={classes.topics__title}>Topics:</span>
            {topicsUI}
        </div>
    );
};

export default Topics;
