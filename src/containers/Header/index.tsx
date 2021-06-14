import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import withLogin from "../../hoc/withLogin";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayName, showLogin } from "../Login/loginSlice";
import { selectDisplayName } from "../../store/store";
import MenuLogout from "./MenuLogout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backdropFilter: "blur(20px)",
    },
    header: {
      backgroundColor: theme.palette.background.paper,
    },
    logo: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const displayName = useSelector(selectDisplayName);

  React.useEffect(() => {
    const disName = localStorage.getItem("displayName");
    if (disName) {
      dispatch(setDisplayName(disName));
    }
  });

  const handleShowLogin = () => {
    dispatch(showLogin());
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.header}>
        <Toolbar>
          <Link to="/">
            <img
              src={Logo}
              alt="Play Game"
              height="80"
              width="70"
              className={classes.logo}
            />
          </Link>
          <Typography
            variant="h3"
            className={classes.title}
            color="textSecondary"
          >
            BlueCat Game
          </Typography>
          <Button href="/">
            <Typography color="textSecondary">Home</Typography>
          </Button>
          {displayName ? (
            <MenuLogout displayName={displayName} />
          ) : (
            <Button onClick={handleShowLogin}>
              <Typography color="textSecondary">Login</Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withLogin(Header);
