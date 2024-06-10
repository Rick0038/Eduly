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
