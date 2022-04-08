import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import classNames from "classnames";
import classes from "./TextInput.module.scss";

interface IProps {
    className?: string,
    value?: string,
    disabled?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onPressEnter?: () => void,
    placeholder?: string,
    label?: string,
    error?: string,
    pattern?: string
}

const TextInput: FC<IProps> = ({
                                   className = "",
                                   value,
                                   disabled,
                                   onChange,
                                   placeholder,
                                   label,
                                   error,
                                   onPressEnter,
                                   pattern
                               }) => {
    function onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            onPressEnter?.()
        }
    }

    return (
        <label className={classNames(classes.wrapper, className)}>
            {label && <span className={classNames(classes.label)}>{label}</span>}
            <input className={classNames(classes.input, error && classes.input_error)}
                   placeholder={placeholder}
                   disabled={disabled}
                   onChange={onChange}
                   value={value}
                   onKeyPress={onKeyPress}/>
            {error && <span className={classes.error}>{error}</span>}
        </label>
    );
}

export default TextInput;
