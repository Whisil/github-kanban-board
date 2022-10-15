import { createSlice } from "@reduxjs/toolkit";

interface BoardState {
    column: any[];
}

const initialState: BoardState = {
    column: [],
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {}
})

export default boardSlice.reducer;