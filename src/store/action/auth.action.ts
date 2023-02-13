import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInfoUser } from "../../service";

interface userLogin {
  data: {
    id: number;
    fullName: string;
    email: string;
    verifyAt: string;
    isVerify: boolean;
    metamaskAddress: string;
    role: string;
  };
  loading: boolean;
  error: any;
}

export const fetchInfoUser = createAsyncThunk(
  "user/fetchInfoUser",
  async (access_token: string, { rejectWithValue }) => {
    const response = await getInfoUser(access_token);
    if (response?.error) {
      return rejectWithValue(response?.error);
    }
    return response?.data;
  }
);

const initialState: userLogin = {
  data: {
    id: 0,
    fullName: "",
    email: "",
    verifyAt: "",
    isVerify: false,
    metamaskAddress: "",
    role: "",
  },
  loading: false,
  error: {},
};

const authAction = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.data = {
        id: 0,
        fullName: "",
        email: "",
        verifyAt: "",
        isVerify: false,
        metamaskAddress: "",
        role: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInfoUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInfoUser.fulfilled, (state, action) => {
      state.data = {
        id: action.payload.id,
        fullName: action.payload.full_name,
        email: action.payload.email,
        verifyAt: action.payload.send_verify_at,
        isVerify: action.payload.is_verified,
        metamaskAddress: action.payload.wallet,
        role: action.payload.role,
      };
      state.loading = false;
    });
    builder.addCase(fetchInfoUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default authAction.reducer;
export const { setUser, resetUser } = authAction.actions;
