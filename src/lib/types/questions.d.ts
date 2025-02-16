declare type Question = {
  answers: Answers[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: Subject;
  exam: Exams;
  createdAt: string;
};

declare type Answers = {
  answer: string;
  key: string;
};
