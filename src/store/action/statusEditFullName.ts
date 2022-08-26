import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusFullName: false,
};

const statusFullNameEditAction = createSlice({
  name: "statusFullNameEdit",
  initialState,
  reducers: {
    setStatusFullNameEdit: (state, action) => {
      // state.statusFullName = action.payload.statusFullName
      state.statusFullName = action.payload;
    },
  },
});

export default statusFullNameEditAction.reducer;
export const { setStatusFullNameEdit } = statusFullNameEditAction.actions;
