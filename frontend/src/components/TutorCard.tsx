import {
  Avatar,
  Badge,
  Button,
  Center,
  Grid,
  Group,
  Paper,
  Rating,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCalendarEvent,
  IconLanguage,
  IconMessage,
  IconUser,
} from '@tabler/icons-react';
import { FC } from 'react';
import { Tutor } from '../model';

const TutorCard: FC<{ tutor: Tutor }> = ({ tutor }) => {
  return (
    <Paper className='p-5' w={'100%'} withBorder shadow='sm'>
      <Grid h={'100%'}>
        <Grid.Col span={'auto'}>
          <Center>
            <Avatar size={'150'} src={tutor.profileImgLink}></Avatar>
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <div>
              <Title order={3}>{`${tutor.firstName} ${tutor.lastName}`}</Title>
              <div>
                <Badge>{tutor.topic}</Badge>
              </div>
              <div className='flex items-center'>
                <IconUser />
                <Text>{tutor.numLessonsTaught} lessons taught</Text>
              </div>
              <div className='flex items-center'>
                <IconLanguage /> <Text>Language: {tutor.language}</Text>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <Text>{tutor.intro}</Text>
            </div>
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={'auto'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <Group justify='space-evenly'>
            <Group>
              <Stack gap={'xs'}>
                <Group>
                  <Rating count={1} defaultValue={1} readOnly />
                  <Text size='lg' fw={700}>
                    {tutor.rating}
                  </Text>
                </Group>
                <Text c={'dimmed'}>({tutor.numberOfRatings} Reviews)</Text>
              </Stack>
            </Group>
            <Group>
              <Text size='lg' fw={700}>
                €{tutor.pricing} /hr
              </Text>
            </Group>
          </Group>
          <Stack justify='center'>
            <Button leftSection={<IconCalendarEvent />}>
              Book Trial Session
            </Button>
            <Button leftSection={<IconMessage />} variant='outline'>
              Send Message
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default TutorCard;
