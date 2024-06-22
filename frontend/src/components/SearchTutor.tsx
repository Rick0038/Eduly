import { Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { topics } from '../util/constants';

export function SearchTutor() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const topic = searchParams.get('topic');
    if (location.pathname === '/search' && topic) {
      setValue(topic);
    } else {
      setValue('');
    }
  }, [location]);

  const handleSubmit = useCallback(
    (value: string | null) => {
      if (!value) {
        return;
      }
      navigate(`/search?topic=${value}`);
    },
    [navigate]
  );

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <Autocomplete
      placeholder='Search tutors by topic'
      leftSection={
        <IconSearch className='w-3 h-3 sm:w-4 sm:h-4' stroke={1.5} />
      }
      data={topics}
      onChange={handleChange}
      onOptionSubmit={handleSubmit}
      value={value}
      classNames={{
        input: 'w-40 sm:w-64 text-xs sm:text-base',
      }}
    />
  );
}
