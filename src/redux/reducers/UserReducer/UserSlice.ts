import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepository} from "../../../models/IRepository";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: {
        avatar_url: "",
        bio: "",
        blog: "",
        email: "",
        followers: 0,
        following: 0,
        location: "",
        login: "",
        name: "",
        public_repos: 0,
        repositories: null,
    },
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userFetching(state) {
            state.user.repositories = null;
            state.isLoading = true
        },
        userFetchingSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false
            state.error = ''
            state.user = action.payload
        },
        userFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        repsFetching(state) {
            state.isLoading = true
        },
        repsFetchingSuccess(state, action: PayloadAction<IRepository[]>) {
            state.isLoading = false
            state.error = null;
            state.user.repositories = action.payload;
        },
        repsFetchingError(state, action: PayloadAction<string>) {
            state.user.repositories = null;
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default userSlice.reducer;
