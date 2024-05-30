import {
  Avatar,
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
  IconSchool,
  IconUser,
} from '@tabler/icons-react';
import { FC } from 'react';
import { Tutor } from '../model';

const TutorCard: FC<{ tutor: Tutor }> = ({ tutor }) => {
  return (
    <Paper style={{ padding: '20px' }} withBorder shadow='sm'>
      <Grid h={'100%'}>
        <Grid.Col span={'auto'}>
          <Center>
            <Avatar size={'150'} src={tutor.profileImgLink}></Avatar>
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={3}>{tutor.name}</Title>
          <div>
            <IconSchool /> {tutor.topic}
          </div>
          <div>
            <IconUser /> {tutor.numLessonsTaught} Lessons taught
          </div>
          <div>
            <IconLanguage /> Language: {tutor.language}
          </div>

          <div style={{ marginTop: '10px' }}>
            <Text>{tutor.intro}</Text>
          </div>
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
