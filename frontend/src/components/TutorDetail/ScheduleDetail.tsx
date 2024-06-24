import { Group, Indicator } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Schedule } from '../../service/StudentService';

export const ScheduleDetail: FC<{ scheduleList: Schedule[] }> = ({
  scheduleList,
}) => {
  const dateList = scheduleList.map((schedule) => schedule.date);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timings, setTimings] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

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
      <Group>
        <DatePicker
          minDate={new Date()}
          value={selectedDate}
          onChange={setSelectedDate}
          renderDay={(date) => dayRenderer(date)}
        />
        {/* <p>{scheduleList}</p> */}
      </Group>
    </>
  );
};
