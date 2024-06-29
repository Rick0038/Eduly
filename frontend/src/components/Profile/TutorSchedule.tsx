import { ActionIcon, Badge, Group, Table } from '@mantine/core';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Tutor } from '../../model';
import { formatDate } from '../../util/helpers';
import { tutorService } from '../../service';
import { notificationService } from '../../service/NotificationService';
import { AddTutorSchedule } from './AddTutorSchedule';

export interface TutorScheduleProps {
  isEditing: boolean;
  tutor: Tutor;
  handleEditToggle: () => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Tutor, Error>>;
}

const statusColors: { [key: string]: string } = {
  FREE: 'green',
  BOOKED: 'red',
  UNAVAILABLE: 'gray',
};

export function TutorSchedule(props: TutorScheduleProps) {
  const { isEditing: isProfileEditing, tutor, refetch, ...otherProps } = props;
  const deleteSchedule = useMutation({
    mutationFn: (id: number) => tutorService.deleteSchedule(id),
    onSuccess: () => {
      notificationService.showSuccess({ message: 'Schedule deleted!' });
      refetch();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  if (isProfileEditing) {
    return <AddTutorSchedule tutor={tutor} refetch={refetch} {...otherProps} />;
  }

  const handleDelete = (sessionId: number) => {
    deleteSchedule.mutate(sessionId);
  };

  return (
    <Table.ScrollContainer minWidth={700}>
      <Table striped withColumnBorders stickyHeader highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>From</Table.Th>
            <Table.Th>To</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tutor.schedule.map((sched) =>
            sched.timings.map((timing) => {
              const formattedDate = formatDate(sched.date, { useIntl: true });
              return (
                <Table.Tr key={timing.sessionId}>
                  <Table.Td>{formattedDate}</Table.Td>
                  <Table.Td>{timing.from}</Table.Td>
                  <Table.Td>{timing.to}</Table.Td>
                  <Table.Td>
                    <Badge color={statusColors[timing.status]}>
                      {timing.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    {timing.status === 'FREE' && (
                      <Group py={0} align='center'>
                        <ActionIcon>
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                          onClick={() => handleDelete(timing.sessionId)}
                          color='red'
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    )}
                  </Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
