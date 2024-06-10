import {
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getTutors } from '../../service/searchApi';
import TutorCard from '../TutorCard';
import { Filters } from '../Filters';
import { useLocation } from 'react-router';

export function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const {
    data: tutorsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getTutors', location.search], // Include query in queryKey for caching purposes
    queryFn: () => getTutors(queryParams ?? ''),
  });

  return (
    <Container size='xl' px='md'>
      <Flex>
        <Stack
          visibleFrom='sm'
          style={{ height: 'calc(100vh - 120px)' }}
          className='max-w-[200px]'
        >
          <Filters />
        </Stack>

        <Divider orientation='vertical' visibleFrom='sm' className='mx-4' />

        <Stack className='flex-grow'>
          {isLoading && (
            <Center style={{ height: 'calc(100vh - 120px)' }}>
              <Loader type='bars'></Loader>
            </Center>
          )}
          {isError && (
            <Text ta='center'>An error occurred while fetching tutors.</Text>
          )}
          {tutorsData?.tutors.map((tutor, index) => (
            <TutorCard key={`${tutor.id}-${index}`} tutor={tutor} />
          ))}
        </Stack>
      </Flex>
    </Container>
  );
}
