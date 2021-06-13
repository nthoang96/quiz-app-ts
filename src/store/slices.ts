import { createSlice } from "@reduxjs/toolkit";

interface LoginSliceState {
  useLogin: boolean;
}

const initialLoginState: LoginSliceState = {
  useLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    showLogin: (state) => {
      state.useLogin = true;
    },
    hideLogin: (state) => {
      state.useLogin = false;
    },
  },
});

export const { showLogin, hideLogin } = loginSlice.actions;
