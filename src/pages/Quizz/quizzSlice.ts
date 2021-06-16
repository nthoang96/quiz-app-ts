import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
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
    setQuestion: (state, action: PayloadAction<Question[]>) => ({
      ...state,
      questions: action.payload,
      answers: [],
    }),
    setAnswer: (state, action: PayloadAction<Answer>) => {
      const currentAnswer = current(state.answers);
      let newAns: Answer[] = [];
      if (currentAnswer.length === 0) newAns = [action.payload];
      else {
        newAns = [...currentAnswer];
        const index = newAns.findIndex((obj) => obj.id === action.payload.id);
        if (index !== -1)
          newAns[index] = {
            id: action.payload.id,
            choice: action.payload.choice,
          };
        else newAns.push(action.payload);
      }

      return {
        ...state,
        answers: newAns,
      };
    },
    setCurrentQuestion: (state, action: PayloadAction<Question>) => {
      state.currentQuestion = action.payload;
    },
  },
});

export const { setQuestion, setAnswer, setCurrentQuestion } =
  quizzSlice.actions;
