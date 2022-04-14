import React, {CSSProperties, FC} from 'react';
import classes from "./BlockShadow.module.scss";
import classNames from "classnames";

interface IProps {
    className?: string
    style?: CSSProperties
}


const BlockShadow: FC<IProps> = ({
                                     className,
                                     children,
                                     style
                                 }) => {
    return <div className={classNames(classes.block, className)} style={style}>
        {children}
    </div>
}

export default BlockShadow;
