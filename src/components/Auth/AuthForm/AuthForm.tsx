import React, {ChangeEvent, FC, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks";
import {checkTokenByFetchProfile} from "../../../redux/reducers/ProfileReducer/ActionCreators";
import TextInput from "../../utils/TextInput/TextInput";
import Button from "../../utils/Button/Button";
import Loading from "../../utils/Loading/Loading";
import classes from "./Auth.module.scss";

const AuthForm: FC = () => {
    const [token, setToken] = useState("");
    const [validationError, setValidationError] = useState<null | string>(null);
    const input = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.profileReducer.error);
    const loading = useAppSelector((state) => state.profileReducer.checkTokenLoading);

    function validationHandler() {
        let flag = true;
        if (!input.current?.checkValidity()) {
            flag = false;
            setValidationError("You can use only Latin letters and numbers");
        } else if (!input?.current?.value || input?.current?.value.length === 0) {
            flag = false;
            setValidationError("This is required field")
        } else {
            setValidationError(null);
        }

        return flag;
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setToken(e.target.value);
        validationHandler();
    }

    function onSubmit() {
        if (!validationHandler()) {
            return
        }

        dispatch(checkTokenByFetchProfile(token));
    }


    return (<>
            <a className={classes.auth__hrefToken}
               href={"https://github.com/settings/tokens"}>
                Get token
            </a>
            <TextInput disabled={loading} className={classes.auth__inputForm}
                       pattern={"[a-zA-Z0-9_]*"}
                       placeholder={"Enter your personal key token"} value={token} ref={input}
                       onChange={onChange} onPressEnter={onSubmit} error={validationError}
            />
            <span className={classes.auth__error}>{error}</span>
            <Button onClick={onSubmit} disabled={loading || validationError !== null} className={classes.auth__btn}>
                SET TOKEN <Loading className={classes.auth__loading} isLoading={loading}/>
            </Button>
        </>
    );
};


export default AuthForm;
