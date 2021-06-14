import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginSliceState {
  useLogin: boolean;
  displayName: string;
}

const initialLoginState: LoginSliceState = {
  useLogin: false,
  displayName: "",
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
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
  },
});

export const { showLogin, hideLogin, setDisplayName } = loginSlice.actions;
