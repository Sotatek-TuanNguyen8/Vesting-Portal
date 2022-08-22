import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInfoUser } from "../../service";

interface userLogin {
  data: {
    id: number;
    fullName: string;
    email: string;
    verifyAt: string;
    isVerify: boolean;
    metamaskAdress: string;
  };
  loading: boolean;
  error: any;
}

export const fetchInfoUser = createAsyncThunk(
  "user/fetchInfoUser",
  async (userId: number, { rejectWithValue }) => {
    const response = await getInfoUser({});

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response.error);
    }

    // Còn không thì trả về dữ liệu
    return response.data;
  }
);

const initialState: userLogin = {
  data: {
    id: 0,
    fullName: "",
    email: "",
    verifyAt: "",
    isVerify: false,
    metamaskAdress: "",
  },
  loading: false,
  error: "",
};

const authAction = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInfoUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInfoUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchInfoUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default authAction.reducer;
export const { setUser } = authAction.actions;
