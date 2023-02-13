import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInfoClaim } from "../../service/claim.service";

interface IGetInfoClaim {
  proof: string[];
  vesting_duration: string;
  cliff_duration: string;
  start_time: string;
  tge: string;
  vesting_type: number;
  allocation_token: string;
}
interface infoClaim {
  data: IGetInfoClaim;
  loading: boolean;
  error: any;
}

export const fetchInfoClaim = createAsyncThunk(
  "user/fetchInfoClaim",
  async (id: number, { rejectWithValue }) => {
    const response = await getInfoClaim(id);
    if (response?.error) {
      return rejectWithValue(response.error);
    }
    return response?.data;
  }
);

const initialState: infoClaim = {
  data: {
    proof: [],
    vesting_duration: "",
    cliff_duration: "",
    start_time: "",
    tge: "",
    vesting_type: 0,
    allocation_token: "",
  },
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
