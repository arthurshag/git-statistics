import { AppDispatch } from "../../redux-store";
import {auth, userAPI} from "../../../api/api";
import {profileSlice} from "./ProfileSlice"
import {IUser} from "../../../models/IUser";

export const checkIsAuth = () => (dispatch: AppDispatch) => {
    dispatch(profileSlice.actions.setIsAuthLoading(true));
    dispatch(profileSlice.actions.clearError());
    userAPI.getCurrent()
        .then(response => {
            dispatch(profileSlice.actions.authSuccess(response as IUser))
        })
        .catch(error => {
            dispatch(profileSlice.actions.setIsAuthLoading(false));
        })
}

export const fetchProfile = () => (dispatch: AppDispatch) => {
    dispatch(profileSlice.actions.setCheckTokenLoading(true));
    userAPI.getCurrent()
        .then(response => {
            dispatch(profileSlice.actions.authSuccess(response as IUser))
        })
        .catch(error => {
            dispatch(profileSlice.actions.authFailed(error.message))
        })
}


export const logout = () => (dispatch: AppDispatch) => {
    auth.setAccessToken("");
    dispatch(profileSlice.actions.reset())
}
