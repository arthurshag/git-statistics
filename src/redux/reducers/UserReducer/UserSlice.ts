import {IUser, IUserWithLoading} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    users: IUserWithLoading[];
}

const newUser: IUserWithLoading = {
    avatar_url: "",
    bio: "",
    blog: "",
    email: "",
    followers: 0,
    following: 0,
    location: "",
    login: "example",
    name: "",
    public_repos: 0,
    isLoading: false,
    error: null
}

const initialState: UserState = {
    users: [{...newUser}],
}

export const userSlice = createSlice({
    name: "user",
    initialState: localStorage.getItem("users") ? {
        ...initialState,
        users: JSON.parse(localStorage.getItem("users") as string) as IUserWithLoading[]
    } : initialState,
    reducers: {
        userFetching(state, action: PayloadAction<number>) {
            state.users[action.payload].repositories = null;
            state.users[action.payload].isLoading = true;
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        userFetchingSuccess(state, action: PayloadAction<{ user: IUser, index: number }>) {
            state.users[action.payload.index] = {...action.payload.user, error: "", isLoading: false}
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        userFetchingError(state, action: PayloadAction<{ error: string, index: number }>) {
            state.users[action.payload.index].isLoading = false
            state.users[action.payload.index].error = action.payload.error
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        addNewUser(state) {
            state.users.push({...newUser})
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        deleteUser(state, action: PayloadAction<number>) {
            state.users.splice(action.payload, 1)
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        changeUserLogin(state, action: PayloadAction<{ login: string, index: number }>) {
            state.users[action.payload.index].login = action.payload.login
            localStorage.setItem("users", JSON.stringify(state.users))
        }
    }
})

export default userSlice.reducer;
