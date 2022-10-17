import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRepo } from "../../api/repoIssuesAPI";

export const fetchRepo = createAsyncThunk(
  "issues/fetchIssues",
  async (url: string, thunkAPI) => {
    try {
      return await getRepo(url);
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
    assignees: any[];
    closedAtTimestamp: string | null;
    forEach: any;
  }[];
  error: string;
  repoInfo: {
    repoName: string,
    repoLink: string,
    ownerName: string,
    ownerLink: string,
    starsCount: number,
  } | null;
}

const initialState: IssuesSliceState = {
  isLoading: false,
  issuesList: [],
  error: "",
  repoInfo: null,
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRepo.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.issuesList.push(action.payload[0]);
      state.repoInfo = action.payload[2];
    },
    [fetchRepo.pending.type]: (state) => {
      state.isLoading = true;
      state.issuesList = [];
      state.error = ``;
      state.repoInfo = null;
    },
    [fetchRepo.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default issuesSlice.reducer;
