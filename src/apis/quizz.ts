import axios, { AxiosInstance } from "axios";

interface Choices {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Question {
  id: number;
  question: string;
  choices: Choices;
}

export interface Answer {
  id: number;
  choice: string;
}

interface SuccessResult {
  status: string;
}

interface FailedResult {
  status: string;
  incorrectAnswers: Question[];
}

class Quizz {
  private readonly restClient: AxiosInstance;
  constructor() {
    this.restClient = axios.create({
      baseURL: "https://react14-contest-easy-quiz-app.herokuapp.com",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  public readonly get = (): Promise<Question[]> =>
    this.restClient
      .get<{ result: Question[] }>(`/quiz`)
      .then((resp) => resp.data.result);
  public readonly post = (answer: {
    listAnswer: Answer[];
  }): Promise<SuccessResult | FailedResult> =>
    this.restClient
      .post<SuccessResult | FailedResult>("/quiz/answer", answer)
      .then((resp) => resp.data);
}

export const quizzAPI = new Quizz();
