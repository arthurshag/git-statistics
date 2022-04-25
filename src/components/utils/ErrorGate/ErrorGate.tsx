import React, {FC} from "react";
import classes from "./ErrorGate.module.scss";
import classNames from "classnames";

interface IProps {
    error: string | null | undefined,
    className?: string
    style?: React.CSSProperties
}


const ErrorGate: FC<IProps> = ({
                                   error,
                                   children,
                                   className,
                                   style
                               }) => {
    return error ?
        <div className={classNames(className, classes.wrapper)} style={style}>{error}</div>
        : <>{children}</>;

}

export default ErrorGate;
