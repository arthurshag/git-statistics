import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer/UserSlice"
import profileReducer from "./reducers/ProfileReducer/ProfileSlice"

const rootReducer = combineReducers({
    profileReducer,
    userReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

