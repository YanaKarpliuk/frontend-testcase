import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `http://localhost:3000/data?_sort=createdAt&_order=desc&_limit=10`;

export const fetchCandidates = createAsyncThunk(
  "data/fetchAll",
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(`${url}&_page=${page}`);
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addCandidate: any = createAsyncThunk(
  "data/addCandidate",
  async (candidate, thunkAPI) => {
    try {
      const response = await axios.post(url, candidate);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
