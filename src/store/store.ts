import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./slices";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectUseLogin = (state: RootState) => state.login.useLogin;

export default store;
