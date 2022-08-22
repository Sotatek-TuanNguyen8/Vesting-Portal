import { createSlice } from "@reduxjs/toolkit";

interface IResendEmail {
  email: string;
  type: string;
}

const initialState: IResendEmail = {
  email: "",
  type: "",
};

const ResendEmailSlice = createSlice({
  name: "resend-email",
  initialState,
  reducers: {
    signUpResendSuccess: (state, action) => {
      state.email = action.payload.email;
      state.type = action.payload.type;
    },
    loginResendSuccess: (state, action) => {
      state.email = action.payload.email;
      state.type = action.payload.type;
    },
  },
});

export default ResendEmailSlice.reducer;
export const { signUpResendSuccess, loginResendSuccess } =
  ResendEmailSlice.actions;
