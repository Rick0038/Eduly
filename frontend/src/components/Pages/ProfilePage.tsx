import { useState } from 'react';
import { Button, Card, Avatar, Title, Rating, Tabs } from '@mantine/core';
import {
  IconUser,
  IconCalendar,
  IconStar,
  IconEdit,
  IconX,
} from '@tabler/icons-react';
import { PersonalInfo } from '../Profile/PersonalInfo';
import { TutorSchedule } from '../Profile/TutorSchedule';
import { Tutor } from '../../model';
import { Reviews } from '../Profile/Reviews';

const user: Tutor = {
  id: '12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'hello@hs-fulda.de',
  status: 'APPROVED',
  pricing: 40,
  rating: 4.7,
  numberOfRatings: 100,
  topic: 'Math',
  language: 'English',
  introText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus ante, tempus blandit augue vitae, molestie venenatis est. Nunc molestie tellus quis efficitur sagittis. Nulla eu laoreet arcu, non sodales.',
  numLessonsTaught: 10,
  profileImgLink: {
    link: 'https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg',
    status: 'PENDING_APPROVAL',
  },
  cv: {
    link: 'http://cv.pdf',
    status: 'PENDING_APPROVAL',
  },
  video: {
    link: 'http://cv.pdf',
    status: 'PENDING_APPROVAL',
  },
  bbbLink: 'https://webconf.hs-fulda.de/b/ale-5zr-osl-go2',
  schedule: [
    {
      date: '2024-09-01',
      timings: [
        {
          sessionId: 123,
          from: '17:00',
          to: '18:00',
          status: 'FREE',
        },
        {
          sessionId: 129,
          from: '19:00',
          to: '20:00',
          status: 'BOOKED',
        },
      ],
    },
    {
      date: '2024-09-02',
      timings: [
        {
          sessionId: 123,
          from: '17:00',
          to: '18:00',
          status: 'FREE',
        },
        {
          sessionId: 456,
          from: '19:00',
          to: '20:00',
          status: 'BOOKED',
        },
      ],
    },
  ],
  reviews: [
    {
      id: 123,
      rating: 4.5,
      text: 'amazing tutor',
      reviewBy: {
        name: 'Jame Adams',
        profileImgLink: 'blah.com/pic',
      },
    },
    {
      id: 345,
      rating: 3,
      text: 'average tutor',
      reviewBy: {
        name: 'Jack Adams',
        profileImgLink: 'blah.com/pic',
      },
    },
  ],
  experience: 0,
  intro: '',
};

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className='mx-auto sm:p-4'>
      <Card shadow='sm' className='px-2 sm:px-4'>
        <div className='profile-header flex items-center mb-4'>
          <Avatar
            src={user.profileImgLink?.link || ''}
            alt={`${user.firstName} ${user.lastName}`}
            size='xl'
            className='mr-4'
          />
          <div className='flex-grow'>
            <Title order={2}>{`${user.firstName} ${user.lastName}`}</Title>
            <Rating value={user.rating} readOnly />
            <p>{`${user.numLessonsTaught} lessons taught`}</p>
          </div>
          <Button
            onClick={handleEditToggle}
            leftSection={
              isEditing ? <IconX size={16} /> : <IconEdit size={16} />
            }
            visibleFrom='sm'
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          <Button onClick={handleEditToggle} hiddenFrom='sm' variant='subtle'>
            {isEditing ? <IconX size={16} /> : <IconEdit size={16} />}
          </Button>
        </div>
        <Tabs defaultValue='personalInfo'>
          <Tabs.List>
            <Tabs.Tab value='personalInfo' leftSection={<IconUser size={16} />}>
              Personal Information
            </Tabs.Tab>
            <Tabs.Tab value='schedule' leftSection={<IconCalendar size={16} />}>
              Schedule
            </Tabs.Tab>
            <Tabs.Tab value='reviews' leftSection={<IconStar size={16} />}>
              Reviews
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='personalInfo' pt='md'>
            <PersonalInfo isEditing={isEditing} user={user} />
          </Tabs.Panel>
          <Tabs.Panel value='schedule' pt='md'>
            <TutorSchedule isEditing={isEditing} tutor={user} />
          </Tabs.Panel>
          <Tabs.Panel value='reviews' pt='md'>
            <Reviews user={user} />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}
