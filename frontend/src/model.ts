import { ROLE } from './constant';

export interface Tutors {
  tutors: Tutor[];
}

export interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  pricing: number;
  rating: number;
  numberOfRatings: number;
  topic: string;
  language: string;
  experience: number;
  intro: string;
  numLessonsTaught: number;
  profileImgLink: string;
}

export interface UserInfo {
  id: number;
  name: string;
  token: string;
  role: ROLE;
  profileImgLink: string;
}
