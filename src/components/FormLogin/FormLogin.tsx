import React, {FC} from 'react';
import classes from "./FormLogin.module.scss"
import TextInput from "../utils/TextInput/TextInput";
import Button from "../utils/Button/Button";

interface FormLoginProps {
    handleClick: () => void,
    text: string,
    setText: (text: string) => void,
    disabled: boolean,
    error: string | null,
}

const FormLogin: FC<FormLoginProps> = ({handleClick, text, setText, disabled, error}) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.form}>
                <TextInput
                    className={classes.input}
                    disabled={disabled}
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <Button
                    type={"primary"}
                    className={classes.btn}
                    disabled={disabled}
                    onClick={()=>handleClick()}
                >
                    Get data
                </Button>
            </div>

            {error && <span className={classes.error}>{error}</span>}
        </div>
    );
};

export default FormLogin;
