import { useState } from 'react';
import {
  Button,
  Card,
  Avatar,
  Group,
  Title,
  Rating,
  Select,
  Tabs,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import {
  IconUser,
  IconCalendar,
  IconStar,
  IconEdit,
  IconX,
  IconCheck,
} from '@tabler/icons-react';
import { PersonalInfo } from '../PersonalInfo';
import { Tutor } from '../../model';

const initialUser: Tutor = {
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
    link: 'http://cv.pdf',
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
  const [user, setUser] = useState<Tutor>(initialUser);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleScheduleChange = (
    dateIndex: number,
    timingIndex: number,
    field: keyof (typeof initialUser.schedule)[0]['timings'][0],
    value: string
  ) => {
    const updatedSchedule = user.schedule.map((day, dIdx) => {
      if (dIdx === dateIndex) {
        return {
          ...day,
          timings: day.timings.map((timing, tIdx) => {
            if (tIdx === timingIndex) {
              return {
                ...timing,
                [field]: value,
              };
            }
            return timing;
          }),
        };
      }
      return day;
    });
    setUser((prevUser) => ({
      ...prevUser,
      schedule: updatedSchedule,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className='container mx-auto p-4'>
      <Card shadow='sm' padding='lg'>
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
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
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
          <Tabs.Panel value='personalInfo' pt='xs'>
            <PersonalInfo isEditing={isEditing} user={user} />
          </Tabs.Panel>
          <Tabs.Panel value='schedule' pt='xs'>
            <div className='schedule mt-6'>
              <Title order={3}>Schedule</Title>
              {user.schedule.map((day, dateIndex) => (
                <Card key={day.date} shadow='sm' padding='lg' className='mt-4'>
                  <Title order={4}>{day.date}</Title>
                  {day.timings.map((session, timingIndex) => (
                    <div key={session.sessionId} className='grid gap-2 mt-2'>
                      <TimeInput
                        label='From'
                        value={session.from}
                        onChange={(value) =>
                          handleScheduleChange(
                            dateIndex,
                            timingIndex,
                            'from',
                            value
                          )
                        }
                      />
                      <TimeInput
                        label='To'
                        value={session.to}
                        onChange={(value) =>
                          handleScheduleChange(
                            dateIndex,
                            timingIndex,
                            'to',
                            value
                          )
                        }
                      />
                      <Select
                        label='Status'
                        value={session.status}
                        onChange={(value) =>
                          handleScheduleChange(
                            dateIndex,
                            timingIndex,
                            'status',
                            value!
                          )
                        }
                        data={[
                          { value: 'FREE', label: 'Free' },
                          { value: 'BOOKED', label: 'Booked' },
                        ]}
                      />
                    </div>
                  ))}
                </Card>
              ))}
            </div>
            {isEditing && (
              <Button
                className='mt-4'
                leftSection={<IconCheck size={16} />}
                onClick={() => console.log('Update Schedule', user)}
              >
                Update Schedule
              </Button>
            )}
          </Tabs.Panel>
          <Tabs.Panel value='reviews' pt='xs'>
            <div className='reviews mt-6'>
              <Title order={3}>Reviews</Title>
              {user.reviews.map((review) => (
                <Card key={review.id} shadow='sm' padding='lg' className='mt-4'>
                  <Group>
                    <Avatar
                      src={review.reviewBy.profileImgLink}
                      alt={review.reviewBy.name}
                    />
                    <div>
                      <Title order={5}>{review.reviewBy.name}</Title>
                      <Rating value={review.rating} readOnly />
                      <p>{review.text}</p>
                    </div>
                  </Group>
                </Card>
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}
