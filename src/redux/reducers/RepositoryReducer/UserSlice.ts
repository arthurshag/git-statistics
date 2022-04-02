import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepository} from "../../../models/IRepository";

interface RepoState {
    repository: IRepository | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: RepoState = {
    repository:null,
    isLoading: false,
    error: null,
}

export const repoSlice = createSlice({
    name: "repository",
    initialState,
    reducers: {
        fetching(state) {
            state.repository = null;
            state.isLoading = true;
            state.error = null;
        },
        fetchingSuccess(state, action: PayloadAction<IRepository>) {
            state.isLoading = false;
            state.repository = action.payload
        },
        fetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default repoSlice.reducer;
