import { Button, Center, Group, Indicator, Radio, Stack } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { filter, isEmpty } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { notificationService } from '../../service/NotificationService';
import { Schedule, Timing, studentService } from '../../service/StudentService';

export const ScheduleDetail: FC<{
  scheduleList: Schedule[];
  onBookMeeting: () => void;
}> = ({ scheduleList, onBookMeeting }) => {
  const dateList = scheduleList.map((schedule) => schedule.date);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timings, setTimings] = useState<Timing[]>([]);
  const [sessionId, setSessionId] = useState<string>();

  const bookSessionMutation = useMutation({
    mutationFn: studentService.bookSession,
    onSuccess: () => {
      notificationService.showSuccess({
        title: 'Success',
        message: 'Meeting booked successfully!',
      });
      onBookMeeting();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  useEffect(() => {
    if (scheduleList && selectedDate) {
      const filteredScheduleList =
        filter(scheduleList, {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        }) || [];
      if (!isEmpty(filteredScheduleList)) {
        setTimings(filteredScheduleList[0].timings);
      } else {
        setTimings([]);
      }
    }
  }, [scheduleList, selectedDate]);

  const dayRenderer: DatePickerProps['renderDay'] = (date: Date) => {
    const day = date.getDate();

    const isDisabled = !dateList.includes(dayjs(date).format('YYYY-MM-DD'));

    return (
      <Indicator size={8} color='green' offset={-5} disabled={isDisabled}>
        <div>{day}</div>
      </Indicator>
    );
  };

  return (
    <>
      <Center style={{ padding: '10px' }}>
        <Stack gap={'lg'}>
          <Group>
            <DatePicker
              hideOutsideDates
              minDate={new Date()}
              value={selectedDate}
              onChange={(val) => {
                setSelectedDate(val);
                setSessionId('');
              }}
              renderDay={(date) => dayRenderer(date)}
            />
            {!isEmpty(timings) && (
              <Radio.Group
                label='Select the meeting time'
                value={sessionId}
                onChange={setSessionId}
                style={{
                  overflowY: 'scroll',
                  maxHeight: '12rem',
                  overflowX: 'hidden',
                }}
              >
                <Stack mt='xs'>
                  {timings.map((t) => (
                    <Radio
                      key={t.sessionId.toString()} // needs to be string since radio group value is only string
                      value={t.sessionId.toString()}
                      label={`${t.from} - ${t.to}`}
                    ></Radio>
                  ))}
                </Stack>
              </Radio.Group>
            )}
          </Group>
          <Button
            disabled={!sessionId}
            onClick={() => {
              if (sessionId) {
                bookSessionMutation.mutate(parseInt(sessionId));
              }
            }}
          >
            Book Meeting
          </Button>
        </Stack>
      </Center>
    </>
  );
};
