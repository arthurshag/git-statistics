import { AppDispatch } from "../../redux-store";
import {auth, userAPI} from "../../../api/api";
import {userSlice} from "./UserSlice"
import {IUser} from "../../../models/IUser";

export const fetchUser = (login: string) => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.userFetching())
    userAPI.getUser(login)
        .then(response => {
            dispatch(userSlice.actions.userFetchingSuccess(response.data as IUser))
        })
        .catch(error => {
            dispatch(userSlice.actions.userFetchingError(error.message))
        })
}


export const fetchCurrentUser = () => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.userFetching())
    userAPI.getCurrent()
        .then(response => {
            dispatch(userSlice.actions.userFetchingSuccess(response as IUser))
        })
        .catch(error => {
            dispatch(userSlice.actions.userFetchingError(error.message))
        })
}


