import React, {ChangeEvent, FC, KeyboardEvent, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks";
import {checkTokenByFetchProfile} from "../../../redux/reducers/ProfileReducer/ActionCreators";
import classes from "../Auth.module.scss";

const AuthForm: FC = () => {
    const [token, setToken] = useState("");
    const [validationError, setValidationError] = useState<null | string>(null);
    const input = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.profileReducer.error);
    const loading = useAppSelector((state) => state.profileReducer.checkTokenLoading);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setValidationError(null);
        setToken(e.target.value);
    }

    function onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }

    function onSubmit() {
        if (!input.current?.checkValidity()) {
            setValidationError("You can use only Latin letters and numbers");
            return;
        }

        dispatch(checkTokenByFetchProfile(token));
    }

    //todo: add validate
    return (<>
            <a className={classes.auth__hrefToken}
               href={"https://github.com/settings/tokens"}>
                Get token
            </a>
            <label className={classes.auth__input}>
                <input disabled={loading} className={classes.auth__inputForm}
                       pattern={"[a-zA-Z0-9_]*"}
                       placeholder={"Enter your personal key token"} value={token} ref={input}
                       onChange={onChange} onKeyDown={onKeyPress}/>
                <span className={classes.auth__inputError}>{validationError || error}</span>
            </label>

            <button onClick={onSubmit} disabled={loading || validationError !== null}>SET TOKEN</button>
        </>
    );
};

export default AuthForm;
