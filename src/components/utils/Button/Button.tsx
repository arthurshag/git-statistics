import React, {FC, MouseEvent} from 'react';
import classNames from "classnames";
import classes from "./Button.module.scss";

interface IProps {
    type?: "default" | "primary" | "danger",
    className?: string,
    disabled?: boolean,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<IProps> = ({
                                type = "default",
                                className = "",
                                children,
                                disabled,
                                onClick
                            }) => {
    return (
        <button onClick={onClick} className={classNames(classes.button, classes["button_" + type], className)}
                disabled={disabled}>
            <span>{children}</span>
        </button>
    );
}

export default Button;
