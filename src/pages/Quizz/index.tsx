import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper, Grid, CircularProgress } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Button } from "@material-ui/core";
import { quizzAPI } from "../../apis/quizz";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer, setCurrentQuestion, setQuestion } from "./quizzSlice";
import { green } from "@material-ui/core/colors";
import {
  selectAnswer,
  selectCurrentQuestion,
  selectQuestion,
} from "../../store/store";

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
    paper_answer: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      transition: ".5s",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgb(0 43 255 / 40%)",
        transform: "scale(1.02)",
      },
    },
    paper_active: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      transition: ".5s",
      cursor: "pointer",
      backgroundColor: "rgb(0 43 255 / 40%)",
      "&:hover": {
        transform: "scale(1.02)",
      },
    },
    paper_result_false: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "rgb(255 0 0 / 80%)",
    },
    paper_result_pass: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "rgb(19 179 8 / 80%)",
    },
    button: {
      padding: theme.spacing(1),
      width: "100%",
    },
    wrapper_submit: {
      position: "relative",
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

const Quizz: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestion);
  const currentQuestions = useSelector(selectCurrentQuestion);
  const answers = useSelector(selectAnswer);
  const [index, setIndex] = React.useState<number>(0);
  const [loadingContainer, setLoadingContainer] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    const getQuizz = async () => {
      const res = await quizzAPI.get();
      setLoadingContainer(true);
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

  const handleClickAnswer = (answer: string) => {
    dispatch(setAnswer({ id: currentQuestions.id, choice: answer }));
  };

  const isActive = () => {
    for (let ans of answers) {
      if (ans.id === currentQuestions.id) {
        return ans.choice;
      }
    }
    return "";
  };

  const handleSubmit = () => {
    const postAnswer = async () => {
      if (!loading) {
        setLoading(true);
        const res = await quizzAPI.post({ listAnswer: answers });
        setLoading(false);
        if (res.status === "P") {
          setResult("Passed 6/6");
        } else {
          setResult(`Failed ${res.incorrectAnswers.length}/6`);
        }
      }
    };
    postAnswer();
  };

  return (
    <div className={classes.root}>
      {result !== "" && (
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper
              className={
                result === "Passed 6/6"
                  ? classes.paper_result_pass
                  : classes.paper_result_false
              }
            >
              {result}
            </Paper>
          </Grid>
        </Grid>
      )}
      {loadingContainer ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                {currentQuestions.question}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper
                className={
                  isActive() === "A"
                    ? classes.paper_active
                    : classes.paper_answer
                }
                onClick={() => handleClickAnswer("A")}
              >
                {currentQuestions.choices.A}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                className={
                  isActive() === "B"
                    ? classes.paper_active
                    : classes.paper_answer
                }
                onClick={() => handleClickAnswer("B")}
              >
                {currentQuestions.choices.B}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper
                className={
                  isActive() === "C"
                    ? classes.paper_active
                    : classes.paper_answer
                }
                onClick={() => handleClickAnswer("C")}
              >
                {currentQuestions.choices.C}
              </Paper>
            </Grid>
            {currentQuestions.choices.D && (
              <Grid item xs={6}>
                <Paper
                  className={
                    isActive() === "D"
                      ? classes.paper_active
                      : classes.paper_answer
                  }
                  onClick={() => handleClickAnswer("D")}
                >
                  {currentQuestions.choices.D}
                </Paper>
              </Grid>
            )}
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
          {answers.length === questions.length && (
            <Grid container spacing={3}>
              <Grid item xs className={classes.wrapper_submit}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Submit
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <CircularProgress size={40} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default Quizz;
