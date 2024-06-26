import { ActionIcon, Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { tutorService } from '../service';

export function SearchTutor() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data: { topics } = {} } = useQuery({
    queryKey: ['getTopics'],
    queryFn: tutorService.getTopics,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const topic = searchParams.get('topic');
    if (location.pathname === '/search' && topic) {
      setValue(topic);
    } else {
      setValue('');
    }
  }, [location]);

  const handleChange = useCallback((v: string) => {
    setValue(v);
  }, []);

  const handleNavigate = useCallback(
    (v?: string) => {
      const searchParams = new URLSearchParams(location.search);

      if (v) {
        searchParams.set('topic', v);
      } else {
        searchParams.delete('topic');
      }

      navigate({
        pathname: '/search',
        search: searchParams.toString(),
      });
    },
    [location.search, navigate]
  );

  return (
    <Autocomplete
      placeholder='Search tutors by topic'
      rightSection={
        <ActionIcon variant='light' onClick={() => handleNavigate(value)}>
          <IconSearch className='w-3 h-3 sm:w-4 sm:h-4' stroke={1.5} />
        </ActionIcon>
      }
      data={topics}
      onChange={handleChange}
      value={value}
      classNames={{
        input: 'w-40 sm:w-64 text-xs sm:text-base',
      }}
    />
  );
}
