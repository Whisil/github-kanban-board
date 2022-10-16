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
  issuesList: {
    title: string;
    issueNumber: number;
    openedAtTimestamp: string;
    user: string;
    userLink: string;
    commentsCount: number;
    assignees: any[] | undefined;
    closedAtTimestamp: string | null;
  }[];
  error: string;
  repoApiUrl: string;
}

const initialState: IssuesSliceState = {
  isLoading: false,
  issuesList: [],
  error: "",
  repoApiUrl: "",
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchIssues.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.issuesList.push(action.payload[0]);
      state.repoApiUrl = action.payload[1];
    },
    [fetchIssues.pending.type]: (state) => {
      state.isLoading = true;
      state.issuesList = [];
      state.error = ``;
      state.repoApiUrl = "";
    },
    [fetchIssues.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default issuesSlice.reducer;
