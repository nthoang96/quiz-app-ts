import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideLogin } from "../../store/slices";
import { selectUseLogin } from "../../store/store";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backdropFilter: "blur(20px)",
    },
  }),
);

const Login: React.FC = () => {
  const classes = useStyles();
  const open = useSelector(selectUseLogin);
  const dispatch = useDispatch();

  const handleCloseLogin = () => {
    dispatch(hideLogin());
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseLogin}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">
          Please login to access the Game!
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="pwd"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary">
            Cancel
          </Button>
          <Button color="primary">Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
