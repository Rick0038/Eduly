import { httpService } from './HTTPService';

export interface TutorDetailResponse {
  id: string;
  firstName: string;
  lastName: string;
  pricing: number;
  rating: number;
  numberOfRatings: number;
  topic: string[];
  language: string;
  introText: string;
  numLessonsTaught: number;
  profileImgLink: string;
  cvLink: string;
  videoLink: string;
  bbbLink: string;
  schedule: Schedule[];
  reviews: Review[];
}

export interface Review {
  id: number;
  rating: number;
  text: string;
  reviewBy: ReviewBy;
}

export interface ReviewBy {
  name: string;
  profileImgLink: string;
}

export interface Schedule {
  date: string;
  timings: Timing[];
}

export interface Timing {
  sessionId: number;
  from: string;
  to: string;
  status: string;
}

class StudentService {
  async getTutorDetails(tutorId: string) {
    return httpService.get<TutorDetailResponse>(`/tutor/${tutorId}`);
  }
}

const studentService = new StudentService();
export { StudentService, studentService };
