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

export function SearchPage() {
  const {
    data: tutorsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getTutors'],
    queryFn: getTutors,
  });

  return (
    <Container size='xl' px='md'>
      <Flex>
        <Stack visibleFrom='sm' className='max-w-[200px] w-96'>
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
          {tutorsData?.tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </Stack>
      </Flex>
    </Container>
  );
}
