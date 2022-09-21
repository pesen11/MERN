import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetail: {},
};
export const UserSlicer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserDetail: (state, actions) => {
      // console.log("state", state);
      // console.log("actions", actions);
      state.userDetail = actions.payload;
    },
  },
});

export const { setUserDetail } = UserSlicer.actions;

export default UserSlicer.reducer;
