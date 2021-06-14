import * as React from "react";
import { Snackbar as MUISnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { selectSnackbar } from "../../store/store";
import { hideSnackbar } from "./snackbarSlice";

const Snackbar: React.FC<any> = () => {
  const stateSnackbar = useSelector(selectSnackbar);
  const dispatch = useDispatch();

  return (
    <MUISnackbar
      open={stateSnackbar.open}
      autoHideDuration={stateSnackbar.duration}
      onClose={() => dispatch(hideSnackbar())}
    >
      <MuiAlert
        onClose={() => dispatch(hideSnackbar())}
        severity={stateSnackbar.type}
      >
        {stateSnackbar.message}
      </MuiAlert>
    </MUISnackbar>
  );
};

export default Snackbar;
