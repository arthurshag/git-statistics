import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer/UserSlice"
import profileReducer from "./reducers/ProfileReducer/ProfileSlice"
import {repositoryApi} from "./reducers/RepositoryReducer/RepositoryRTK";
import {usersRTK} from "./reducers/UserReducer/UserRTK";


const rootReducer = combineReducers({
    [repositoryApi.reducerPath]: repositoryApi.reducer,
    [usersRTK.reducerPath]: usersRTK.reducer,
    profileReducer,
    userReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(usersRTK.middleware, repositoryApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

