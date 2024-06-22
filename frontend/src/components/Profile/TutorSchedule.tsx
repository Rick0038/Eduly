import { Badge, Button, MultiSelect, Table, Text } from '@mantine/core';
import { Tutor } from '../../model';
import { formatDate } from '../../util/helpers';
import { IconCheck } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

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
  const { isEditing, tutor } = props;

  if (isEditing) {
    return <EditTutorSchedule />;
  }

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

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const hours = [
  '12:00 AM',
  '01:00 AM',
  '02:00 AM',
  '03:00 AM',
  '04:00 AM',
  '05:00 AM',
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
  '11:00 PM',
];

const availability = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

export function EditTutorSchedule() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      availability: availability,
    },
  });

  const handleSubmit = (values: unknown) => {
    console.log('values', values);
    // TODO: Hit the API
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className='schedule'>
      <Text w={700} size='lg' pb='sm'>
        Set Your Availability
      </Text>
      {days.map((day) => (
        <MultiSelect
          label={day}
          name={`availability.${day}`}
          placeholder={`Your availability for ${day}`}
          data={hours}
          className='mb-1'
          key={form.key(`availability.${day}`)}
          {...form.getInputProps(`availability.${day}`)}
        />
      ))}
      <Button
        className='mt-4'
        leftSection={<IconCheck size={16} />}
        type='submit'
      >
        Save Availability
      </Button>
    </form>
  );
}
