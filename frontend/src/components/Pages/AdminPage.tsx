import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

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
    </>
  );
}
