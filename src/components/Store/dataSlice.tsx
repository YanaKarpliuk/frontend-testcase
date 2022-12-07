import { createSlice } from "@reduxjs/toolkit";
import { fetchCandidates, addCandidate } from "./operations";
import { RootState } from "./store";

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  feedback: string;
  grade: number;
  passed: string;
  createdAt: string;
}

interface DataState {
  candidateData: CandidateData[];
  isLoading: boolean;
  error: null | unknown;
  total: number | null;
  page: number | null;
}

const initialState: DataState = {
  candidateData: [],
  isLoading: false,
  error: null,
  page: null,
  total: null,
};

const dataSlice = createSlice({
  name: "candidateData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCandidates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCandidates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      if (state.page !== action.meta.arg) {
        state.candidateData = [...state.candidateData, ...action.payload.data];
        state.page = action.meta.arg;
      }

      state.total = parseInt(action.payload.headers["x-total-count"] || "0");
    });
    builder.addCase(fetchCandidates.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(addCandidate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCandidate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.candidateData.unshift(action.payload);
    });
    builder.addCase(addCandidate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const selectCandidateData = (state: RootState) =>
  state.data.candidateData;

export const selectTotal = (state: RootState) => state.data.total;

export const selectPage = (state: RootState) => state.data.page;

export const selectIsLoading = (state: RootState) => state.data.isLoading;

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
