import React, {FC, useEffect, useRef, useState} from "react";
import loadingGif from "../../../assets/loading.gif";
import classes from "./Loading.module.scss";
import classNames from "classnames";

interface IProps {
    isLoading: boolean,
    className?: string
    style?: React.CSSProperties
}


const Loading: FC<IProps> = ({
                                 isLoading,
                                 children,
                                 className,
                                 style
                             }) => {
    const [minLoading, setMinLoading] = useState(isLoading);
    const time = useRef<Date | null>(null);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const minimumTimeWait = 500;
    useEffect(() => {
        if (isLoading) {
            setMinLoading(isLoading);
            time.current = new Date();
            if (timeout.current)
                clearTimeout(timeout.current)
            return;
        }

        if (time.current) {
            const dif = time.current.valueOf() - new Date().valueOf();
            if (dif > minimumTimeWait) {
                setMinLoading(isLoading);
                return;
            }
            timeout.current = setTimeout(() => {
                setMinLoading(false);
            }, minimumTimeWait - dif);
        }
    }, [isLoading])

    return minLoading ?
        <section className={classNames(className, classes.wrapper)} style={style}>
            <img className={classes.img} src={loadingGif}/>
        </section>
        : <>{children}</>;

}

export default Loading;
