import { Card, Skeleton, Tabs, Text } from '@mantine/core';
import {
  IconCalendar,
  IconFileCv,
  IconStar,
  IconUser,
  IconVideo,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { tutorService } from '../../service';
import { PersonalInfo } from '../Profile/PersonalInfo';
import { ProfileHead } from '../Profile/ProfileHead';
import { Reviews } from '../Profile/Reviews';
import { TutorCV } from '../Profile/TutorCV';
import { TutorSchedule } from '../Profile/TutorSchedule';
import { TutorVideo } from '../Profile/TutorVideo';

export function TutorProfile() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getProfile'],
    queryFn: tutorService.getProfile,
  });

  const handleEditToggle = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  return (
    <div className='mx-auto sm:p-4'>
      <Card shadow='sm' className='px-2 sm:px-4'>
        {isLoading ? (
          <>
            <Skeleton height={100} radius='sm' />
            <Skeleton height={400} mt='md' radius='sm' />
          </>
        ) : isError || !data ? (
          <Text className='text-center' c='red'>
            Unable to fetch profile details!
          </Text>
        ) : (
          <>
            <ProfileHead
              isEditing={isEditing}
              user={data}
              handleEditToggle={handleEditToggle}
            />
            <Tabs defaultValue='personalInfo'>
              <Tabs.List>
                <Tabs.Tab
                  value='personalInfo'
                  leftSection={<IconUser size={16} />}
                >
                  Personal Information
                </Tabs.Tab>
                <Tabs.Tab
                  value='schedule'
                  leftSection={<IconCalendar size={16} />}
                >
                  Schedule
                </Tabs.Tab>
                <Tabs.Tab value='cv' leftSection={<IconFileCv size={16} />}>
                  Your CV
                </Tabs.Tab>
                <Tabs.Tab value='video' leftSection={<IconVideo size={16} />}>
                  Intro Video
                </Tabs.Tab>
                <Tabs.Tab value='reviews' leftSection={<IconStar size={16} />}>
                  Reviews
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='personalInfo' pt='md'>
                <PersonalInfo
                  isEditing={isEditing}
                  user={data}
                  handleEditToggle={handleEditToggle}
                />
              </Tabs.Panel>
              <Tabs.Panel value='schedule' pt='md'>
                <TutorSchedule isEditing={isEditing} tutor={data} />
              </Tabs.Panel>
              <Tabs.Panel value='cv' pt='md'>
                <TutorCV
                  isEditing={isEditing}
                  tutor={data}
                  handleEditToggle={handleEditToggle}
                />
              </Tabs.Panel>
              <Tabs.Panel value='video' pt='md'>
                <TutorVideo
                  isEditing={isEditing}
                  tutor={data}
                  handleEditToggle={handleEditToggle}
                />
              </Tabs.Panel>
              <Tabs.Panel value='reviews' pt='md'>
                <Reviews user={data} />
              </Tabs.Panel>
            </Tabs>
          </>
        )}
      </Card>
    </div>
  );
}
