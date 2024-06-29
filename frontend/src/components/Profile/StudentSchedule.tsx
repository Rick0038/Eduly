import {
  ActionIcon,
  Avatar,
  Center,
  Container,
  Group,
  Loader,
  Table,
  Text,
  Tooltip,
  rem,
} from '@mantine/core';
import { IconTrash, IconVideo } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notificationService } from '../../service/NotificationService';
import { studentService } from '../../service/StudentService';

export const StudentSchedule = () => {
  const { data, refetch, isError, isLoading } = useQuery({
    queryFn: studentService.getUpcomingAppointments,
    queryKey: ['getUpcomingAppointments'],
  });

  const cancelSessionMutation = useMutation({
    mutationFn: studentService.cancelSession,
    onSuccess: (data) => {
      notificationService.showSuccess({
        message: data.message,
      });
      refetch();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  if (isError) {
    <Container>
      <Text ta='center'>
        An error occurred while fetching upcoming appointments.
      </Text>
    </Container>;
  }

  if (isLoading) {
    <Container>
      <Center style={{ height: '100%' }}>
        <Loader type='bars'></Loader>
      </Center>
    </Container>;
  }

  const rows = data?.upcomingAppointments.map((item) => (
    <Table.Tr key={item.sessionId}>
      <Table.Td>
        <Text fz='sm'>{item.date}</Text>
      </Table.Td>

      <Table.Td>
        <Text fz='sm'>{item.from}</Text>
      </Table.Td>

      <Table.Td>
        <Text fz='sm'>{item.to}</Text>
      </Table.Td>

      <Table.Td>
        <Group gap='sm'>
          <Avatar size={30} src={item.tutorDetail.profileImgLink} radius={30} />
          <Text fz='sm' fw={500}>
            {item.tutorDetail.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group>
          <Tooltip label='Open Meeting Room'>
            <ActionIcon
              onClick={() => window.open(item.tutorDetail.bbbLink, '_blank')}
              variant='subtle'
            >
              <IconVideo
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>

          <Tooltip label='Cancel Session'>
            <ActionIcon
              onClick={() => {
                cancelSessionMutation.mutate(item.sessionId);
              }}
              variant='subtle'
              color='red'
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  if (data) {
    return (
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing='sm'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>From Time</Table.Th>
              <Table.Th>To Time</Table.Th>
              <Table.Th>Tutor</Table.Th>
              <Table.Th>Actions </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    );
  }
};
