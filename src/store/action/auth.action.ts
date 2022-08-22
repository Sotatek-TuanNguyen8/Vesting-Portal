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
  error: string;
}

const fetchInfoUser = createAsyncThunk(
  "user/fetchInfoUser",
  async (userId: number, { dispatch, getState }) => {
    const response = await getInfoUser({});
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
    fetchInfo: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.error = "";
    },
    fetchInfoSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchInfoFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default authAction.reducer;
export const { setUser } = authAction.actions;
