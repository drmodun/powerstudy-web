export interface QuestionAnswer {
  id: number;
  question: string;
  answer: string;
  userId: number;
  updatedAt: Date;
}

export interface CreateQuestionAnswerModel {
  question: string;
}
