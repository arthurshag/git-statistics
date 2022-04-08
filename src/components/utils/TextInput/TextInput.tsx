import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import classNames from "classnames";
import classes from "./TextInput.module.scss";

interface IProps {
    className?: string,
    disabled?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onPressEnter?: () => void,
    placeHolder?: string,
    label?: string,
    error?: string,
}

const TextInput: FC<IProps> = ({
                                   className = "",
                                   disabled,
                                   onChange,
                                   placeHolder,
                                   label,
                                   error,
                                   onPressEnter
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
                   placeholder={placeHolder}
                   disabled={disabled}
                   onChange={onChange}
                   onKeyPress={onKeyPress}/>
            {error && <span className={classes.error}>{error}</span>}
        </label>
    );
}

export default TextInput;
