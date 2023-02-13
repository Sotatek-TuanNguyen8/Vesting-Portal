import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateSecret } from "../../service/ggAuth.service";

interface ggAuth {
  data: {
    secret: string;
    otp_auth: string;
  };
  loading: boolean;
  error: any;
}

export const fetchGenerateSecret = createAsyncThunk(
  "user/fetchGenerateSecret",
  async (access_token: string, { rejectWithValue }) => {
    const [response, error] = await generateSecret();
    if (error) {
      return rejectWithValue(response?.error);
    }
    return response?.data;
  }
);

const initialState: ggAuth = {
  data: {
    secret: "",
    otp_auth: "",
  },
  loading: false,
  error: {},
};

const authAction = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGGAuth: (state, action) => {
      state.data = action.payload;
    },
    resetGGAuth: (state) => {
      state.data = {
        secret: "",
        otp_auth: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenerateSecret.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGenerateSecret.fulfilled, (state, action) => {
      state.data = {
        secret: action.payload.secret,
        otp_auth: action.payload.otp_auth,
      };
      state.loading = false;
    });
    builder.addCase(fetchGenerateSecret.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default authAction.reducer;
export const { setGGAuth, resetGGAuth } = authAction.actions;
