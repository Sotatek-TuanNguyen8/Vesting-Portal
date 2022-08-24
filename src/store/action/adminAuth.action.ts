import { createSlice } from "@reduxjs/toolkit";

interface adminLogin {
  token: string;
}

const initialState: adminLogin = {
  token: "",
};

const adminAuthAction = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default adminAuthAction.reducer;
export const { setAdminToken } = adminAuthAction.actions;
