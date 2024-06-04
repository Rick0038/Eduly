import { Select } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router';

export function SearchTutor() {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse the query parameters
  const params = new URLSearchParams(location.search);
  const subject = params.get('subject') || '';

  const handleSelectChange = (value: string | null) => {
    if (!value) {
      navigate('/search');
      return;
    }
    navigate(`/search?subject=${value}`);
  };

  return (
    <Select
      placeholder='Search tutors by subject'
      data={['Physics', 'Computer Science', 'Mathematics', 'Chemistry']}
      searchable
      value={subject}
      onChange={handleSelectChange}
    />
  );
}
