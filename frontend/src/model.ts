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
  cvLink: string;
  videoLink: string;
}

export interface UserInfo {
  id: number;
  name: string;
  token: string;
  role: ROLE;
  profileImgLink: string;
}
export interface Conversations {
  conversations: Conversation[];
}

export interface Conversation {
  chatId: string | undefined;
  lastMessageContent: string;
  name: string;
  profileImgLink: string;
  userId: number;
}

export interface Chats {
  messages: Message[];
}

export interface Message {
  messageId: number;
  content: string;
  timestamp: string;
  senderName: string;
  senderId: number;
  senderRole: ROLE;
  chatId: number;
}

export interface Topic {
  topics: string[];
}
