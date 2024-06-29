import { ActionIcon, Badge, Group, Table } from '@mantine/core';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Schedule, ScheduleTiming, Tutor } from '../../model';
import { tutorService } from '../../service';
import { notificationService } from '../../service/NotificationService';
import { AddTutorSchedule } from './AddTutorSchedule';
import { useState } from 'react';
import dayjs from 'dayjs';
import { EditTutorScheduleModal } from './EditTutorScheduleModal';

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

interface EditSchedule {
  schedule: Schedule;
  timing: ScheduleTiming;
}

export function TutorSchedule(props: TutorScheduleProps) {
  const { isEditing: isProfileEditing, tutor, refetch, ...otherProps } = props;
  const [editSchedule, setEditSchedule] = useState<EditSchedule | null>(null);
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

  const handleEdit = (schedule: Schedule, timing: ScheduleTiming) => {
    setEditSchedule({ schedule, timing });
  };

  const handleModalClose = () => {
    setEditSchedule(null);
  };

  return (
    <>
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
              sched.timings.map((timing) => (
                <Table.Tr key={timing.sessionId}>
                  <Table.Td>
                    {dayjs(sched.date).format('MMM DD, YYYY')}
                  </Table.Td>
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
                        <ActionIcon onClick={() => handleEdit(sched, timing)}>
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
              ))
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {editSchedule && (
        <EditTutorScheduleModal
          schedule={editSchedule.schedule}
          timing={editSchedule.timing}
          onClose={handleModalClose}
          refetch={refetch}
        />
      )}
    </>
  );
}
