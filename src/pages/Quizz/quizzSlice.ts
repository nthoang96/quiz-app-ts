import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, Question } from "../../apis/quizz";

interface QuestionSliceState {
  questions: Question[];
}

interface AnswerSliceState {
  answers: Answer[];
}

interface CurrentQuestionSliceState {
  currentQuestion: Question;
}

const initialQuizzState: QuestionSliceState &
  AnswerSliceState &
  CurrentQuestionSliceState = {
  questions: [],
  answers: [],
  currentQuestion: {
    id: 0,
    question: "",
    choices: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
  },
};

export const quizzSlice = createSlice({
  name: "quizz",
  initialState: initialQuizzState,
  reducers: {
    setQuestion: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.answers = [];
    },
    setAnswer: (state, action: PayloadAction<Answer[]>) => {
      state.questions = [];
      state.answers = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<Question>) => {
      state.currentQuestion = action.payload;
    },
  },
});

export const { setQuestion, setAnswer, setCurrentQuestion } =
  quizzSlice.actions;
