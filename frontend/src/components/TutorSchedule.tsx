import { Badge, Table } from '@mantine/core';
import { Tutor } from '../model';
import { formatDate } from '../util/helpers';

interface TutorScheduleProps {
  isEditing: boolean;
  tutor: Tutor;
}

const statusColors: { [key: string]: string } = {
  FREE: 'green',
  BOOKED: 'red',
  UNAVAILABLE: 'gray',
};

export function TutorSchedule(props: TutorScheduleProps) {
  const { tutor } = props;

  // if (isEditing) {
  //   return <EditTutorSchedule tutor={tutor} />;
  // }

  return (
    <Table striped withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>From</Table.Th>
          <Table.Th>To</Table.Th>
          <Table.Th>Status</Table.Th>
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
              </Table.Tr>
            );
          })
        )}
      </Table.Tbody>
    </Table>
  );
}
