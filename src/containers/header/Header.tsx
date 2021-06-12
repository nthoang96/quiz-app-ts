import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backdropFilter: "blur(20px)",
    },
    logo: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
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
            color="textPrimary"
          >
            BlueCat Game
          </Typography>
          <Button href="/">
            <Typography>Home</Typography>
          </Button>
          <Button>
            <Typography>Login</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
