import {
  Center,
  Container,
  Loader,
  Paper,
  Stack,
  Tabs,
  Text,
  rem,
} from '@mantine/core';
import { IconCalendar, IconStar } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Tutor } from '../../model';
import { studentService } from '../../service/StudentService';
import TutorCard from '../TutorCard';
import { ScheduleDetail } from './ScheduleDetail';

export const TutorDetail = () => {
  const { tutorId } = useParams();

  const {
    data: tutorDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getTutorDetail', tutorId],
    queryFn: () => studentService.getTutorDetails(tutorId as string),
  });

  const iconStyle = { width: rem(12), height: rem(12) };

  if (isLoading) {
    return (
      <Container>
        <Center style={{ height: 'calc(100vh - 120px)' }}>
          <Loader type='bars'></Loader>
        </Center>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Text ta={'center'}>
          An error occurred while fetching tutor details.
        </Text>
      </Container>
    );
  }

  return (
    tutorDetail && (
      <Stack>
        <TutorCard tutor={tutorDetail as unknown as Tutor}></TutorCard>
        <Paper className='p-5' w={'100%'} withBorder shadow='sm'>
          <Tabs defaultValue={'schedule'}>
            <Tabs.List>
              <Tabs.Tab
                value='schedule'
                leftSection={<IconCalendar style={iconStyle} />}
              >
                Schedule
              </Tabs.Tab>

              <Tabs.Tab
                value='reviews'
                leftSection={<IconStar style={iconStyle} />}
              >
                Reviews
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='schedule'>
              <ScheduleDetail scheduleList={tutorDetail.schedule} />
            </Tabs.Panel>

            <Tabs.Panel value='reviews'>Reviews Content</Tabs.Panel>
          </Tabs>
        </Paper>
      </Stack>
    )
  );
};
