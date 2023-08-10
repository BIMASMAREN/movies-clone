import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    Profile_: false,
    LoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.Profile_ = false;
    },
    setLoading: (state, action) => {
      const { boolean } = action.payload;
      state.Profile_ = boolean;
    },
    LoginUser: (state) => {
      (state.LoggedIn = true)
    },
    LogOut: (state) =>{
      (state.LoggedIn = false)
    },
  },
});

export const { setUser, setLoading , LoginUser, LogOut } = userSlice.actions;

export default userSlice.reducer;
