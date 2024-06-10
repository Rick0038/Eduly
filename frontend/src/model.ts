export interface Tutors {
  tutors: Tutor[];
}

export interface Tutor {
  id: string;
  name: string;
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
