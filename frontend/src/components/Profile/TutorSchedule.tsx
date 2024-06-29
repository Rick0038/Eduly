import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Select,
  Table,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { Tutor } from '../../model';
import { formatDate } from '../../util/helpers';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';
import { hours } from '../../util/constants';

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

export function EditTutorSchedule() {
  const form = useForm({
    initialValues: {
      schedules: [{ date: '', from: '', to: '' }],
    },
  });

  const addForm = () => {
    form.insertListItem('schedules', { date: '', from: '', to: '' });
  };

  const removeForm = (index: number) => {
    form.removeListItem('schedules', index);
  };

  const handleSubmit = (values: unknown) => {
    console.log('values', values);
    // TODO: Hit the API
  };

  const handleFromTimeChange = (index: number, value: string | null) => {
    if (!value) return;
    const toIndex = (hours.indexOf(value) + 1) % hours.length;
    form.setFieldValue(`schedules.${index}.from`, value);
    form.setFieldValue(`schedules.${index}.to`, hours[toIndex]);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text w={700} size='lg' pb='sm'>
          Set Your Availability
        </Text>
        {form.values.schedules.map((_, index) => (
          <Box key={index} className='mb-4 max-w-[500px]'>
            <DateInput
              label='Date'
              placeholder='Pick a date'
              {...form.getInputProps(`schedules.${index}.date`)}
              required
            />
            <Group mt='xs' align='center'>
              <Select
                label='From'
                placeholder='Select time'
                data={hours}
                {...form.getInputProps(`schedules.${index}.from`)}
                onChange={(value) => handleFromTimeChange(index, value)}
                required
              />
              <Select
                label='To'
                placeholder='Select time'
                data={hours}
                {...form.getInputProps(`schedules.${index}.to`)}
                required
                disabled
              />
              <ActionIcon
                variant='outline'
                color='red'
                onClick={() => removeForm(index)}
                className='sm:mt-7'
                visibleFrom='sm'
              >
                <IconTrash size={16} />
              </ActionIcon>
              <Button
                variant='outline'
                color='red'
                onClick={() => removeForm(index)}
                hiddenFrom='sm'
                leftSection={<IconTrash size={16} />}
              >
                Remove slot
              </Button>
            </Group>
          </Box>
        ))}
        <Group p='apart' mt='md'>
          <Button leftSection={<IconPlus size={16} />} onClick={addForm}>
            Add Another Time Slot
          </Button>
          <Button
            leftSection={<IconCheck size={16} />}
            fullWidth
            type='submit'
            mt='xl'
          >
            Save Availability
          </Button>
        </Group>
      </form>
    </>
  );
}
