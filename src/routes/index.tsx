import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

//Pages
import { HomePage, WhoIsMillianaire } from "../pages";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 96,
    },
  }),
);

export const Routes: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Switch>
          <Route path="/who-is-the-millianaire">
            <WhoIsMillianaire />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};
