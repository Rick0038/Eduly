import { Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const largeData = Array(100)
  .fill(0)
  .map((_, index) => `Subject ${index + 1}`);

export function SearchTutor() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const subject = searchParams.get('subject');
    if (location.pathname === '/search' && subject) {
      setValue(subject);
    } else {
      setValue('');
    }
  }, [location]);

  const handleSubmit = useCallback(
    (value: string | null) => {
      if (!value) {
        return;
      }
      navigate(`/search?subject=${value}`);
    },
    [navigate]
  );

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <Autocomplete
      placeholder='Search tutors by subject'
      leftSection={
        <IconSearch className='w-3 h-3 sm:w-4 sm:h-4' stroke={1.5} />
      }
      data={largeData}
      onChange={handleChange}
      onOptionSubmit={handleSubmit}
      value={value}
      classNames={{
        input: 'w-40 sm:w-64 text-xs sm:text-base',
      }}
    />
  );
}
