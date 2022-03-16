import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import reducer from "./reducers/reducer";

let rootReducer = combineReducers({
    reducer
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

