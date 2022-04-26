import React, {FC, useEffect, useRef, useState} from "react";
import loadingGif from "../../../assets/loading.gif";
import classes from "./Loading.module.scss";
import classNames from "classnames";

interface IProps {
    isLoading: boolean,
    className?: string
    style?: React.CSSProperties
}


const LoadingDefault: FC<IProps> = ({
                                 isLoading,
                                 children,
                                 className,
                                 style
                             }) => {
    return isLoading ?
        <div className={classNames(className, classes.wrapper)} style={style}>
            <img className={classes.img} src={loadingGif}/>
        </div>
        : <>{children}</>;

}

export default LoadingDefault;
