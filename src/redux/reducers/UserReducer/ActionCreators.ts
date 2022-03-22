import { AppDispatch } from "../../redux-store";
import {userAPI} from "../../../api/api";
import {userSlice} from "./UserSlice"

export const fetchUser = (login: string) => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.userFetching())
    userAPI.getUser(login)
        .then(response => {
            dispatch(userSlice.actions.userFetchingSuccess(response.data))
        })
        .catch(error => {
            dispatch(userSlice.actions.userFetchingError(error.message))
        })
}
