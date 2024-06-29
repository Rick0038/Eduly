import { Card, Skeleton, Tabs, Text } from '@mantine/core';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { studentService } from '../../service/StudentService';
import { ProfileHead } from './ProfileHead';
import { StudentPersonalInfo } from './StudentPersonalInfo';
import { StudentSchedule } from './StudentSchedule';

export const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getProfile'],
    queryFn: studentService.getStudentProfileDetails,
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
              isStudent={true}
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
                  Upcoming appointments
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='personalInfo' pt='md'>
                <StudentPersonalInfo
                  isEditing={isEditing}
                  user={data}
                  handleEditToggle={handleEditToggle}
                />
              </Tabs.Panel>
              <Tabs.Panel value='schedule' pt='md'>
                <StudentSchedule />
              </Tabs.Panel>
            </Tabs>
          </>
        )}
      </Card>
    </div>
  );
};
