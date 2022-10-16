import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIssues } from "../../api/repoAPI";

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (url: string, thunkAPI) => {
    try {
      return await getIssues(url);
    } catch (err) {
      return thunkAPI.rejectWithValue(`C'mon, check your link!`);
    }
  }
);

interface IssuesSliceState {
  isLoading: boolean;
  column: {
    title: string;
    issueNumber: number;
    openedTimestamp: string;
    user: string;
    userLink: string;
    commentsCount: string;
    repoApiUrl: string;
  }[];
  error: string;
}

const initialState: IssuesSliceState = {
  isLoading: false,
  column: [],
  error: "",
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchIssues.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.column.push(action.payload);
    },
    [fetchIssues.pending.type]: (state) => {
      state.isLoading = true;
      state.column = [];
      state.error = ``;
    },
    [fetchIssues.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default issuesSlice.reducer;
