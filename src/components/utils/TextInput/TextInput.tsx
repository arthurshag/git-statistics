import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import classNames from "classnames";
import classes from "./TextInput.module.scss";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onPressEnter?: () => void,
    label?: string,
    error?: string,

}

const TextInput: FC<IProps> = ({
                                   className = "",
                                   label,
                                   error,
                                   onPressEnter,
                                   ...props
                               }) => {
    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            onPressEnter?.()
        }
    }

    return (
        <label className={classNames(classes.wrapper, className)}>
            {label && <span className={classNames(classes.label)}>{label}</span>}
            <input
                className={classNames(classes.input, error && classes.input_error, props.disabled && classes.input_disabled)} {...props}
                onKeyDown={onKeyDown}/>
            {error && <span className={classes.error}>{error}</span>}
        </label>
    );
}

export default TextInput;
