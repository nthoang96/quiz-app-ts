import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color as AlertColorType } from "@material-ui/lab/Alert";

interface SnackbarSliceState {
  open?: boolean;
  type?: AlertColorType;
  message?: string;
  duration: number;
}

const initialSnackbarState: SnackbarSliceState = {
  open: false,
  type: "error" as AlertColorType,
  message: "",
  duration: 3000,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialSnackbarState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarSliceState>) => ({
      ...initialSnackbarState,
      ...action.payload,
      open: true,
    }),
    hideSnackbar: (state) => ({ ...state, open: false }),
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
