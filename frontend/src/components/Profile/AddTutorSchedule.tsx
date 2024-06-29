import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { ActionIcon, Box, Button, Group, Select, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';
import { TutorScheduleProps } from './TutorSchedule';
import { tutorService } from '../../service';
import { notificationService } from '../../service/NotificationService';
import { hours } from '../../util/constants';

export function AddTutorSchedule(props: Omit<TutorScheduleProps, 'isEditing'>) {
  const { handleEditToggle, refetch } = props;

  const addScheduleBulk = useMutation({
    mutationFn: tutorService.addScheduleBulk,
    onSuccess: (results) => {
      const { success, failure } = results;
      if (success > 0) {
        notificationService.showSuccess({
          message: `${success} schedule(s) added successfully!`,
        });
      }
      if (failure > 0) {
        notificationService.showError({
          message: `${failure} schedule(s) failed to add.`,
        });
      }
      refetch();
      handleEditToggle();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

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

  const handleFromTimeChange = (index: number, value: string | null) => {
    if (!value) return;
    const toIndex = (hours.indexOf(value) + 1) % hours.length;
    form.setFieldValue(`schedules.${index}.from`, value);
    form.setFieldValue(`schedules.${index}.to`, hours[toIndex]);
  };

  const handleSubmit = (values: { schedules: Record<string, string>[] }) => {
    const completeSchedules = values.schedules
      .filter((schedule) => schedule.date && schedule.from && schedule.to)
      .map((schedule) => ({
        date: dayjs(schedule.date).format('YYYY-MM-DD'),
        from: schedule.from,
        to: schedule.to,
      }));

    addScheduleBulk.mutate(completeSchedules);
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
              minDate={dayjs().toDate()}
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
