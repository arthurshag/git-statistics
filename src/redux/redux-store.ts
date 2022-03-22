import {configureStore, combineReducers} from "@reduxjs/toolkit";
import reducer from "./reducers/reducer";
import userReducer from "./reducers/UserReducer/UserSlice"

let rootReducer = combineReducers({
    reducer,
    userReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// type RootReducerType = typeof rootReducer;
// export type AppStateType = ReturnType<RootReducerType>;

