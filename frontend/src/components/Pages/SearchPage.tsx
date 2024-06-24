import {
  ActionIcon,
  Center,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  Loader,
  NativeSelect,
  Pagination,
  Stack,
  Text,
} from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Tutor } from '../../model';
import { tutorService } from '../../service/TutorService';
import { Filters } from '../Filters';
import TutorCard from '../TutorCard';

export function SearchPage() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const {
    data: tutorsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getTutors', location.search], // Include query in queryKey for caching purposes
    queryFn: () => tutorService.getTutors(queryParams ?? ''),
  });

  const availableSortTypes = ['Highest rating', 'Most popular', 'Lowest price'];
  const [sortType, setSortType] = useState(availableSortTypes[0]);

  const sortTutors = (selectedSortType: string) => {
    setSortType(selectedSortType);
    tutorsData?.tutors.sort((tutorA: Tutor, tutorB: Tutor) => {
      if (selectedSortType === 'Highest rating') {
        return tutorA.rating < tutorB.rating
          ? 1
          : tutorA.rating === tutorB.rating
            ? 0
            : -1;
      } else if (selectedSortType === 'Most popular') {
        return tutorA.numberOfRatings < tutorB.numberOfRatings
          ? 1
          : tutorA.numberOfRatings === tutorB.numberOfRatings
            ? 0
            : -1;
      } else if (selectedSortType === 'Lowest price') {
        return tutorA.pricing > tutorB.pricing
          ? 1
          : tutorA.pricing === tutorB.pricing
            ? 0
            : -1;
      }
      return 0;
    });
  };

  const [activePage, setActivePage] = useState(1);
  const resultsPerPage = 10;

  return (
    <Container size='xl' px='md'>
      <Flex>
        <Stack
          visibleFrom='sm'
          style={{ height: 'calc(100vh - 120px)' }}
          className='max-w-[200px]'
        >
          <NativeSelect
            label='Sort'
            data={availableSortTypes}
            value={sortType}
            onChange={(event) => sortTutors(event.currentTarget.value)}
          />
          <Filters />
        </Stack>

        <Divider orientation='vertical' visibleFrom='sm' className='mx-4' />

        <Stack className='flex-grow'>
          {/* Filters for mobile screen */}
          <Group hiddenFrom='sm'>
            <ActionIcon
              variant='default'
              aria-label='Filters in drawer'
              size='sm'
              bd={0}
              onClick={() => setDrawerOpened(true)}
            >
              <IconAdjustments stroke={1} />
            </ActionIcon>
            <Drawer
              opened={drawerOpened}
              onClose={() => setDrawerOpened(false)}
              title={
                <Text size='lg' fw={500} hiddenFrom='sm'>
                  Filters
                </Text>
              }
              padding='md'
              size='sm'
            >
              <NativeSelect
                label='Sort'
                data={availableSortTypes}
                value={sortType}
                onChange={(event) => sortTutors(event.currentTarget.value)}
              />
              <Filters onSubmit={() => setDrawerOpened(false)} />
            </Drawer>
          </Group>
          <Group>
            {isLoading && (
              <Container>
                <Center style={{ height: 'calc(100vh - 120px)' }}>
                  <Loader type='bars'></Loader>
                </Center>
              </Container>
            )}
            {isError && (
              <Container>
                <Text ta='center'>
                  An error occurred while fetching tutors.
                </Text>
              </Container>
            )}
            {tutorsData?.tutors
              .slice(
                resultsPerPage * (activePage - 1),
                resultsPerPage * activePage
              )
              .map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)}
            {tutorsData && tutorsData.tutors && (
              <Container mb={40}>
                <Pagination
                  value={activePage}
                  onChange={setActivePage}
                  total={Math.ceil(tutorsData.tutors.length / resultsPerPage)}
                  mt={'sm'}
                ></Pagination>
              </Container>
            )}
          </Group>
        </Stack>
      </Flex>
    </Container>
  );
}
