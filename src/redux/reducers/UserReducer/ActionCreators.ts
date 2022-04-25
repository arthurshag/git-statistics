import {AppDispatch} from "../../redux-store";
import {userAPI} from "../../../api/api";
import {userSlice} from "./UserSlice"
import {IUser} from "../../../models/IUser";

export const fetchUser = (login: string, index: number) => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.userFetching(index))
    userAPI.getUser(login)
        .then(response => {
            dispatch(userSlice.actions.userFetchingSuccess({user: response.data as IUser, index}))
        })
        .catch(error => {
            dispatch(userSlice.actions.userFetchingError({error: error.message, index}))
        })
}
