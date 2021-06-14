import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../containers/Login/loginSlice";
import { snackbarSlice } from "../containers/Snackbar/snackbarSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectUseLogin = (state: RootState) => state.login.useLogin;
export const selectDisplayName = (state: RootState) => state.login.displayName;
export const selectSnackbar = (state: RootState) => state.snackbar;

export default store;
