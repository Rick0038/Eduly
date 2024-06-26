import { ActionIcon, Autocomplete } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTopics } from '../hooks';

export function SearchTutor() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data: { topics } = {} } = useTopics();

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

      if (v && topics?.includes(v)) {
        searchParams.set('topic', v);
      } else {
        searchParams.delete('topic');
      }

      navigate({
        pathname: '/search',
        search: searchParams.toString(),
      });
    },
    [location.search, navigate, topics]
  );

  const handleSubmit = useCallback(
    (v: string | null) => {
      if (!v) {
        return;
      }
      handleNavigate(v);
    },
    [handleNavigate]
  );

  const handleClear = useCallback(() => {
    setValue('');
    handleNavigate();
  }, [handleNavigate]);

  return (
    <Autocomplete
      placeholder='Search tutors by topic'
      rightSection={
        value.length ? (
          <ActionIcon variant='light' onClick={handleClear}>
            <IconX className='w-3 h-3 sm:w-4 sm:h-4' stroke={1.5} />
          </ActionIcon>
        ) : (
          <ActionIcon variant='light' onClick={() => handleNavigate()}>
            <IconSearch className='w-3 h-3 sm:w-4 sm:h-4' stroke={1.5} />
          </ActionIcon>
        )
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
