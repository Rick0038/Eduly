import {
  ActionIcon,
  Badge,
  Center,
  Container,
  Flex,
  Loader,
  Stack,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { adminService } from '../../service';
import { notificationService } from '../../service/NotificationService';
import { IconUserCheck } from '@tabler/icons-react';

export function BannedUsersStack() {
  const {
    data: bannedUsersData,
    isLoading,
    isError,
    refetch: refetchBannedUsersData,
  } = useQuery({
    queryKey: ['getBannedUsers'],
    queryFn: adminService.getBannedUsers,
  });

  const unbanTutorMutation = useMutation({
    mutationFn: adminService.unbanTutor,
    onSuccess: () => {
      notificationService.showSuccess({
        title: 'Success',
        message: 'Tutor ban lifted successfully.',
      });
      refetchBannedUsersData();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const unbanStudentMutation = useMutation({
    mutationFn: adminService.unbanStudent,
    onSuccess: () => {
      notificationService.showSuccess({
        title: 'Success',
        message: 'Student ban lifted successfully.',
      });
      refetchBannedUsersData();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const roleColors: Record<string, string> = {
    TUTOR: 'blue',
    STUDENT: 'pink',
  };

  return (
    <>
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
            An error occurred while fetching the list of banned users.
          </Text>
        </Container>
      )}
      {bannedUsersData && bannedUsersData?.users.length === 0 && (
        <Container my={20}>
          <Text ta='center'>
            You have not banned any users. Everyone is safely having fun at Eduly!
          </Text>
        </Container>
      )}
      {bannedUsersData && bannedUsersData?.users.length != 0 && (
        <Table verticalSpacing='md'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={'center'}>Name</Table.Th>
              <Table.Th ta={'center'}>Role</Table.Th>
              <Table.Th ta={'right'}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {bannedUsersData?.users.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Stack gap={'sm'}>
                    <Text ta={'left'} fz='sm' fw={500}>
                      {item.name}
                    </Text>
                    <Text ta={'left'} c='dimmed' fz='xs'>
                      #{item.id}
                    </Text>
                  </Stack>
                </Table.Td>

                <Table.Td>
                  <Center>
                    <Badge color={roleColors[item.role]} variant='light'>
                      {item.role}
                    </Badge>
                  </Center>
                </Table.Td>

                <Table.Td>
                  <Flex mx={10} justify={'flex-end'}>
                    <Tooltip
                      label={'Unban'}
                      transitionProps={{ transition: 'scale', duration: 300 }}
                    >
                      <ActionIcon
                        variant='subtle'
                        color='green'
                        onClick={() => {
                          if (item.role === 'TUTOR') {
                            unbanTutorMutation.mutate(item.id);
                          }
                          if (item.role === 'STUDENT') {
                            unbanStudentMutation.mutate(item.id);
                          }
                        }}
                      >
                        <IconUserCheck stroke={1.5} />
                      </ActionIcon>
                    </Tooltip>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </>
  );
}
