import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer/UserSlice"
import repositoriesReducer from "./reducers/ReposReducer/RepositoriesSlice";
let rootReducer = combineReducers({
    userReducer,
    repositoriesReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

