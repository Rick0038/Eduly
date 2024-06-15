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

export interface Conversations {
  conversations: Conversation[];
}

export interface Conversation {
  id: string;
  user: string;
  timestamp: string;
}

export interface Chats {
  messages: Message[];
}

export interface Message {
  id: string;
  chatId: string;
  sender: string;
  message: string;
  timestamp: string;
}
