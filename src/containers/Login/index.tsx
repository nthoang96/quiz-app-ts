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
import { hideLogin, setDisplayName } from "./loginSlice";
import { selectUseLogin } from "../../store/store";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { showSnackbar } from "../Snackbar/snackbarSlice";
import withSnackbar from "../../hoc/withSnackbar";
import Users from "../../constants/users.json";

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
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleCloseLogin = () => {
    dispatch(hideLogin());
  };

  const isEmptyUserNamePassword = () => {
    if (userName.trim() === "" || password.trim() === "") {
      return true;
    }
    return false;
  };

  const isValidAuth = () => {
    for (let user of Users) {
      if (user.username === userName && user.password === password) {
        localStorage.setItem("displayName", user.display_name);
        dispatch(setDisplayName(user.display_name));
        return true;
      }
    }
    return false;
  };

  const handleLogin = () => {
    let snackbarOptions: any = {};
    if (isEmptyUserNamePassword()) {
      snackbarOptions = {
        message: "Username and password required.",
        type: "error",
      };
      dispatch(showSnackbar(snackbarOptions));
      return;
    }

    if (isValidAuth()) {
      snackbarOptions = {
        message: "Login successfully!",
        type: "success",
      };
      dispatch(showSnackbar(snackbarOptions));
      handleCloseLogin();
      return;
    }

    snackbarOptions = {
      message: "Username or password is incorrect.",
      type: "error",
    };
    dispatch(showSnackbar(snackbarOptions));
  };

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
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
            onChange={handleUserNameChange}
          />
          <TextField
            margin="dense"
            id="pwd"
            label="Password"
            type="password"
            fullWidth
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withSnackbar(Login);
