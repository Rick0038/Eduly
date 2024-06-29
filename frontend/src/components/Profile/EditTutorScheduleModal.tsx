import { Modal, Group, Button, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { IconCheck } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { hours } from '../../util/constants';
import { Schedule, ScheduleTiming, Tutor } from '../../model';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { tutorService } from '../../service';
import { notificationService } from '../../service/NotificationService';

interface EditTutorScheduleModalProps {
  schedule: Schedule;
  timing: ScheduleTiming;
  onClose: () => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Tutor, Error>>;
}

export function EditTutorScheduleModal(props: EditTutorScheduleModalProps) {
  const { schedule, timing, onClose, refetch } = props;
  const editSchedule = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, string> }) =>
      tutorService.editSchedule(id, data),
    onSuccess: () => {
      notificationService.showSuccess({ message: 'Schedule updated!' });
      refetch();
      onClose();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const form = useForm({
    initialValues: {
      date: dayjs(schedule.date).toDate(),
      from: timing.from,
      to: timing.to,
    },
  });

  const handleSubmit = (values: { date: Date; from: string; to: string }) => {
    const updatedSchedule = {
      date: dayjs(values.date).format('YYYY-MM-DD'),
      from: values.from,
      to: values.to,
    };
    editSchedule.mutate({ id: timing.sessionId, data: updatedSchedule });
  };

  const handleFromTimeChange = (value: string | null) => {
    if (!value) return;
    const fromIndex = hours.indexOf(value);
    const toIndex = (fromIndex + 1) % hours.length;
    form.setFieldValue('from', value);
    form.setFieldValue('to', hours[toIndex]);
  };

  return (
    <Modal opened onClose={onClose} title='Edit Schedule'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <DateInput
          label='Date'
          placeholder='Pick a date'
          minDate={dayjs().toDate()}
          {...form.getInputProps('date')}
          required
        />
        <Select
          label='From'
          placeholder='Select time'
          data={hours}
          {...form.getInputProps('from')}
          onChange={handleFromTimeChange}
          required
        />
        <Select
          label='To'
          placeholder='Select time'
          data={hours}
          {...form.getInputProps('to')}
          required
          disabled
        />
        <Group align='right' mt='md'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' leftSection={<IconCheck size={16} />}>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
