import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepository} from "../../../models/IRepository";

interface UserState {
    user: IUser | null;
    isAuthLoading: boolean;
    checkTokenLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    checkTokenLoading: false,
    isAuthLoading: false,
    error: null,
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        reset(state) {
            state.user = null;
            state.error = null;
            state.isAuthLoading = false;
            state.checkTokenLoading = false;
        },
        authSuccess(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.checkTokenLoading = false;
            state.isAuthLoading = false;
        },
        authFailed(state, action: PayloadAction<string>) {
            state.checkTokenLoading = false;
            state.error = action.payload;
        },

        setIsAuthLoading(state, action: PayloadAction<boolean>) {
            state.isAuthLoading = action.payload;
        },
        setCheckTokenLoading(state, action: PayloadAction<boolean>) {
            state.checkTokenLoading = action.payload;
        },
        clearError(state) {
            state.error = null;
        }
    }
})

export default profileSlice.reducer;
