import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Button } from "@material-ui/core";
import { quizzAPI } from "../../apis/quizz";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion, setQuestion } from "./quizzSlice";
import { selectCurrentQuestion, selectQuestion } from "../../store/store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    button: {
      padding: theme.spacing(1),
      width: "100%",
    },
  }),
);

const Quizz: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestion);
  const currentQuestions = useSelector(selectCurrentQuestion);
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const getQuizz = async () => {
      const res = await quizzAPI.get();
      dispatch(setQuestion(res));
      dispatch(setCurrentQuestion(res[0]));
      setIndex(0);
    };
    getQuizz();
  }, [dispatch]);

  const handleClickPrevious = () => {
    let nextIndex = index - 1;
    if (nextIndex >= 0) {
      dispatch(setCurrentQuestion(questions[nextIndex]));
      setIndex(nextIndex);
    }
  };

  const handleClickNext = () => {
    let nextIndex = index + 1;
    if (nextIndex <= questions.length - 1) {
      dispatch(setCurrentQuestion(questions[nextIndex]));
      setIndex(nextIndex);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>{currentQuestions.question}</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{currentQuestions.choices.A}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{currentQuestions.choices.B}</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{currentQuestions.choices.C}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{currentQuestions.choices.D}</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<NavigateBeforeIcon />}
            onClick={handleClickPrevious}
          >
            Previous
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<NavigateNextIcon />}
            onClick={handleClickNext}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Quizz;
