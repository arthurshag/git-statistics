import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    exampleValue: ""
};

export const slice = createSlice({
    name: "reducer",
    initialState,
    reducers: {
        exampleAction(state, {payload}: PayloadAction<string>) {
            state.exampleValue = payload
        },
    },
    extraReducers: {}
});


export default slice.reducer;
