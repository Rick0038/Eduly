import { authService } from '../../service';
import { StudentProfile } from '../Profile/StudentProfile';
import { TutorProfile } from './TutorProfile';

export const ProfilePage = () => {
  if (authService.isStudent) {
    return <StudentProfile />;
  } else {
    return <TutorProfile />;
  }
};
