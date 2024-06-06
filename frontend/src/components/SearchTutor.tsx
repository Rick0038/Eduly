import { Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const largeData = Array(100)
  .fill(0)
  .map((_, index) => `Subject ${index + 1}`);

export function SearchTutor() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (value: string | null) => {
      if (!value) {
        return;
      }
      navigate(`/search?subject=${value}`);
    },
    [navigate]
  );

  return (
    <Autocomplete
      placeholder='Search tutors by subject'
      leftSection={
        <IconSearch className='w-3 h-3 sm:w-4 sm:h-4' stroke={1.5} />
      }
      data={largeData}
      onOptionSubmit={handleSubmit}
      classNames={{
        input: 'w-40 sm:w-64 text-xs sm:text-base',
      }}
    />
  );
}
