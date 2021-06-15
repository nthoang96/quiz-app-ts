import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../containers/Login/loginSlice";
import { snackbarSlice } from "../containers/Snackbar/snackbarSlice";
import { quizzSlice } from "../pages/Quizz/quizzSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    snackbar: snackbarSlice.reducer,
    quizz: quizzSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectUseLogin = (state: RootState) => state.login.useLogin;
export const selectDisplayName = (state: RootState) => state.login.displayName;
export const selectSnackbar = (state: RootState) => state.snackbar;
export const selectQuestion = (state: RootState) => state.quizz.questions;
export const selectAnswer = (state: RootState) => state.quizz.answers;
export const selectCurrentQuestion = (state: RootState) =>
  state.quizz.currentQuestion;

export default store;
