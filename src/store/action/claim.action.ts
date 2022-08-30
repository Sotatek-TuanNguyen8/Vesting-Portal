import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInfoClaim } from "../../service/claim.service";

interface infoClaim {
  data: {};
  loading: boolean;
  error: any;
}

export const fetchInfoClaim = createAsyncThunk(
  "user/fetchInfoClaim",
  async (access_token: string, { rejectWithValue }) => {
    const response = await getInfoClaim({});
    if (response?.error) {
      return rejectWithValue(response.error);
    }
    return response?.data;
  }
);

const initialState: infoClaim = {
  data: {},
  loading: false,
  error: "",
};

const claimAction = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInfoClaim.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInfoClaim.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchInfoClaim.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default claimAction.reducer;
