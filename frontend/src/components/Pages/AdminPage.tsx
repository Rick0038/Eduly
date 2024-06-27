import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { TutorsStack } from '../AdminPageComponents/TutorsStack';
import { StudentsStack } from '../AdminPageComponents/StudentsStack';

export function AdminPage() {
  const [adminPage, setAdminPage] = useState('tutor');

  return (
    <>
      <SegmentedControl
        fullWidth
        value={adminPage}
        onChange={setAdminPage}
        data={[
          { label: 'Tutor content', value: 'tutor' },
          { label: 'Student content', value: 'student' },
          { label: 'Banned users', value: 'banned' },
        ]}
      />
      {adminPage === 'tutor' && <TutorsStack />}
      {adminPage === 'student' && <StudentsStack />}
    </>
  );
}
