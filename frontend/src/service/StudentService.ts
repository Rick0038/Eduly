import { httpService } from './HTTPService';

export interface TutorDetailResponse {
  id: number;
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

export interface StudentSchedule {
  upcomingAppointments: UpcomingAppointment[];
}

export interface UpcomingAppointment {
  date: string;
  sessionId: number;
  from: string;
  to: string;
  status: string;
  tutorDetail: TutorDetail;
}

export interface TutorDetail {
  id: number;
  name: string;
  profileImgLink: string;
  bbbLink: string;
}

export interface StudentProfileDetail {
  id: number;
  status: 'APPROVED' | 'BANNED';
  firstName: string;
  lastName: string;
  email: string;
  profileImgLink: string;
}

export interface StudentProfileReq {
  firstName: string;
  lastName: string;
  email: string;
}

class StudentService {
  async getTutorDetails(tutorId: string) {
    return httpService.get<TutorDetailResponse>(`/api/v1/tutor/${tutorId}`);
  }

  async bookSession(sessionId: number) {
    return httpService.put(`/api/v1/student/book/${sessionId}`);
  }

  async cancelSession(sessionId: number) {
    return httpService.put<{ message: string }>(
      `/api/v1/student/cancel/${sessionId}`
    );
  }

  async writeReview(reviewReq: {
    tutorId: number;
    rating: number;
    text: string;
  }) {
    const { tutorId, rating, text } = reviewReq;
    return httpService.post(`/api/v1/student/write-review/tutor/${tutorId}`, {
      rating,
      text,
    });
  }

  async getUpcomingAppointments() {
    return httpService.get<StudentSchedule>(
      `api/v1/student/upcoming-appointments`
    );
  }

  async updateStudentProfile(profileDetail: StudentProfileReq) {
    return httpService.put(`api/v1/student/profile`, profileDetail);
  }

  async updateProfileImage(data: FormData) {
    const url = '/api/v1/student/profileImage';
    const response = await httpService.put<Record<string, string>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  async getStudentProfileDetails() {
    return httpService.get<StudentProfileDetail>(`api/v1/student/profile`);
  }
}

const studentService = new StudentService();
export { StudentService, studentService };
