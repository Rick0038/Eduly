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

export function SearchPage() {
  const {
    data: tutorsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getTutors'],
    queryFn: getTutors,
  });

  if (isLoading) {
    return (
      <Center style={{ height: 'calc(100vh - 120px)' }}>
        <Loader type='bars'></Loader>
      </Center>
    );
  }

  if (isError) {
    return <Text ta='center'>An error occurred while fetching tutors.</Text>;
  }

  return (
    <Container size='xl' px='md'>
      <Flex>
        <Stack className='w-96'>
          <Text size='md' fw={500}>
            Filters
          </Text>
        </Stack>

        <Divider orientation='vertical' className='mx-4' />

        <Stack className='flex-grow'>
          {tutorsData?.tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </Stack>
      </Flex>
    </Container>
  );
}
