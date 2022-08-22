import { createSlice } from "@reduxjs/toolkit";

interface IResendEmail {
  email: string;
}

const initialState: IResendEmail = {
  email: "",
};

const ResendEmailSlice = createSlice({
  name: "resend-email",
  initialState,
  reducers: {
    signUpResendSuccess: (state, action) => {
      state.email = action.payload;
    },
    loginResendSuccess: (state, action) => {
      state.email = action.payload;
    },
  },
});

export default ResendEmailSlice.reducer;
export const { signUpResendSuccess, loginResendSuccess } =
  ResendEmailSlice.actions;
