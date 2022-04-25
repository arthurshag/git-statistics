import React, {FC} from 'react';
import classNames from "classnames";
import classes from "./Button.module.scss";

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    type?: "default" | "primary" | "danger",
}

const Button: FC<IProps> = ({
                                type = "default",
                                className,
                                children,
                                ...props
                            }) => {
    return (
        <button className={classNames(classes.button, classes["button_" + type], className)} {...props}>
            <span>{children}</span>
        </button>
    );
}

export default Button;
