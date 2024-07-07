import {
  Avatar,
  Badge,
  Button,
  Center,
  Grid,
  Group,
  Modal,
  Paper,
  Rating,
  Spoiler,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconFileCv,
  IconLanguage,
  IconMessage,
  IconUser,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ROLE } from '../constant';
import { Tutor } from '../model';
import { authService, chatService } from '../service';
import { notificationService } from '../service/NotificationService';
import { VideoViewer } from './VideoViewer';

const TutorCard: FC<{ tutor: Tutor }> = ({ tutor }) => {
  const [message, setMessage] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const sendMessage = useMutation({
    mutationFn: chatService.startChat,
    onSuccess: (data) => {
      const chatId = data.chatId;
      navigate(`/messages/${chatId}`);
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      const params = {
        id: tutor.id,
        payload: {
          message,
        },
      };
      sendMessage.mutate(params);
    }
  };

  const handleViewCV = (url: string) => {
    window.open(url, '_blank');
  };

  const tutorName = `${tutor.firstName} ${tutor.lastName}`;

  return (
    <Fragment>
      <Paper className='p-5' w={'100%'} withBorder shadow='sm'>
        <Grid h={'100%'}>
          <Grid.Col span={'auto'}>
            <Center>
              <Avatar
                size={'150'}
                src={tutor.profileImgLink as string}
              ></Avatar>
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <div>
                <Link
                  to={
                    authService.isLoggedIn() && authService.isStudent
                      ? `/tutor/${tutor.id}`
                      : `/login?role=${ROLE.STUDENT}&redirect=/tutor/${tutor.id}`
                  }
                >
                  <Title order={3}>{tutorName}</Title>
                </Link>
                <Group>
                  {tutor.topic.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </Group>
                <div className='flex items-center'>
                  <IconUser />
                  <Text>{tutor.numLessonsTaught} lessons taught</Text>
                </div>
                <div className='flex items-center'>
                  <IconLanguage /> <Text>Language: {tutor.language}</Text>
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <Spoiler maxHeight={100} showLabel='Show more' hideLabel='Hide'>
                  {tutor.intro}
                </Spoiler>
              </div>
              <Group>
                <VideoViewer url={tutor.videoLink} />
                <Button
                  onClick={() => handleViewCV(tutor.cvLink)}
                  variant='light'
                  leftSection={<IconFileCv />}
                >
                  View CV
                </Button>
              </Group>
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
            {authService.isStudent && (
              <Stack justify='center'>
                <Button
                  leftSection={<IconMessage />}
                  variant='outline'
                  onClick={open}
                >
                  Send Message
                </Button>
              </Stack>
            )}
          </Grid.Col>
        </Grid>
      </Paper>

      <Modal
        opened={opened}
        onClose={close}
        centered
        title={
          <Text>
            Send message to <span className='font-bold'>{tutorName}</span>
          </Text>
        }
      >
        <Textarea
          label='Write a message'
          description='Please be respectful and briefly explain your questions.'
          placeholder='Type your message here...'
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          required
          autosize
          minRows={5}
        />
        <Button onClick={handleSendMessage} fullWidth mt='md'>
          Send
        </Button>
      </Modal>
    </Fragment>
  );
};

export default TutorCard;
