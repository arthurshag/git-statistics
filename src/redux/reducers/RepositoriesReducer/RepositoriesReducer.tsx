import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepository} from "../../../models/IRepository";

interface RepositoryState {
    repositories: IRepository[];
    isLoading: boolean;
    error: string | null;
    paginate: {
        isLoading: boolean;
        error: string | null
        couldLoadMore: boolean;
    }
}

const initialState: RepositoryState = {
    repositories: [],
    isLoading: false,
    error: null,
    paginate: {
        isLoading: false,
        error:null,
        couldLoadMore: false,
    }
}

export const repositoriesSlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {
        fetching(state) {
            state.isLoading = true
            state.error = null;
        },
        fetchingSuccess(state, action: PayloadAction<IRepository[]>) {
            state.isLoading = false
            state.repositories = action.payload;
        },
        fetchingError(state, action: PayloadAction<string>) {
            state.repositories = [];
            state.isLoading = false;
            state.error = action.payload;
        },

        paginateFetching(state) {
            state.paginate.isLoading = true
            state.paginate.error = null;
        },
        paginateFetchingSuccess(state, action: PayloadAction<IRepository[]>) {
            state.paginate.isLoading = false
            state.repositories = [...state.repositories, ...action.payload];
        },
        paginateFetchingError(state, action: PayloadAction<string>) {
            state.paginate.couldLoadMore = false
            state.paginate.error = action.payload;
        },
        paginateSetCouldLoadMore(state, action: PayloadAction<boolean>) {
            state.paginate.couldLoadMore = action.payload;
        }
    }
})

export default repositoriesSlice.reducer;
