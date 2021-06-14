import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

//Pages
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import Quizz from "../pages/Quizz";

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
          <ProtectedRoute path="/quiz-game" component={Quizz} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Container>
    </div>
  );
};
