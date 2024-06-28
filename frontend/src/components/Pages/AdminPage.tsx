import { useState } from 'react';
import { Box, Divider, Tabs } from '@mantine/core';
import { TutorsStack } from '../AdminPageComponents/TutorsStack';
import { StudentsStack } from '../AdminPageComponents/StudentsStack';
import { BannedUsersStack } from '../AdminPageComponents/BannedUsersStack';
import { IconShieldCheckFilled } from '@tabler/icons-react';

export function AdminPage() {
  const [adminPage, setAdminPage] = useState<string | null>('tutor');

  return (
    <>
      <Tabs
        value={adminPage}
        onChange={setAdminPage}
        variant='pills'
        radius='xs'
      >
        <Tabs.List grow>
          <Tabs.Tab value='tutor'>
            Tutor
          </Tabs.Tab>
          <Tabs.Tab value='student'>
            Student
          </Tabs.Tab>
          <Tabs.Tab value='banned'>Banned users</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Divider
        my='xs'
        variant='dashed'
        labelPosition='center'
        label={
          <>
            <IconShieldCheckFilled size={12} />
            <Box mx={5}> EDULY ADMIN MODE </Box>
            <IconShieldCheckFilled size={12} />
          </>
        }
      />

      {adminPage === 'tutor' && <TutorsStack />}
      {adminPage === 'student' && <StudentsStack />}
      {adminPage === 'banned' && <BannedUsersStack />}
    </>
  );
}
