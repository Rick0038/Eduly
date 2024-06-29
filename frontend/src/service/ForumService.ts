import { httpService } from './HTTPService';

export interface QuestionsResponse {
  questions: Question[];
}

export interface Question {
  id: number;
  title: string;
  description: string;
  questionBy: string;
  timestamp: string;
}
export interface AnswerResponse {
  question: Question;
  answers: Answer[];
}

export interface Answer {
  id: number;
  description: string;
  answerBy: string;
  timestamp: Date;
}

class ForumService {
  async getQuestions(keyword: string) {
    const url = keyword
      ? `/forums/questions?keyword=${keyword}`
      : `/forums/questions`;
    return httpService.get<QuestionsResponse>(url);
  }

  async getAnswers(questionId: number) {
    return httpService.get<AnswerResponse>(`/forums/answer/${questionId}`);
  }

  async postQuestion(question: { title: string; description: string }) {
    return httpService.post(`/api/v1/forums/ask`, question);
  }

  async postAnswer(answer: { questionId: number; description: string }) {
    const { questionId, description } = answer;
    return httpService.post(`api/v1/forums/answer/${questionId}`, {
      description,
    });
  }
}

const forumService = new ForumService();
export { ForumService, forumService };
