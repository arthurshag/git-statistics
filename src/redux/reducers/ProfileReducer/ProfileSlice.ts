import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IUser | null;
    isAuthLoading: boolean;
    checkTokenLoading: boolean;
    error: string | null;
    messages: {value: string}[]
}

const initialState: UserState = {
    user: null,
    checkTokenLoading: false,
    isAuthLoading: false,
    error: null,
    messages: []
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
        },
        setMessage(state, action: PayloadAction<string>) {
            if (!state.messages.find(({value}) => value === action.payload))
                state.messages.push({value: action.payload});
        },
        clearMessage(state, action: PayloadAction<{ id: number }>) {
            state.messages = state.messages.filter((e, i) => i !== action.payload.id);
        }
    }
})

export default profileSlice.reducer;
