import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepository} from "../../../models/IRepository";

interface RepositoriesState {
    repositories: IRepository[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: RepositoriesState = {
    repositories: null,
    isLoading: false,
    error: null,
}

export const repositoriesSlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {
        setReps(state, action: PayloadAction<IRepository[] | null>) {
            state.repositories = action.payload;
        },
        repsFetching(state) {
            state.isLoading = true
        },
        repsFetchingSuccess(state, action: PayloadAction<IRepository[]>) {
            state.isLoading = false
            state.error = null;
            state.repositories = action.payload
        },
        repsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const actions = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
