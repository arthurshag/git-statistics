import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks";
import {auth} from "../../../api/api";
import {fetchProfile} from "../../../redux/reducers/ProfileReducer/ActionCreators";
import classes from "../Auth.module.scss";

const AuthForm: FC = () => {
    const [token, setToken] = useState("");
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.profileReducer.error);
    const loading = useAppSelector((state) => state.profileReducer.checkTokenLoading);

    function onSubmit() {
        auth.setAccessToken(token);
        dispatch(fetchProfile());
    }

    //todo: add validate
    return (<>
            <a className={classes.auth__hrefToken}
               href={"https://github.com/settings/tokens"}>
                Get token
            </a>
            <label className={classes.auth__input}>
                <span className={classes.auth__inputError}>{error}</span>
                <input disabled={loading} className={classes.auth__inputForm} type={"text"}
                       placeholder={"Enter your personal key token"} value={token}
                       onChange={(e) => setToken(e.target.value)}/>
            </label>

            <button onClick={onSubmit} disabled={loading}>SET TOKEN</button>
        </>
    );
};

export default AuthForm;
