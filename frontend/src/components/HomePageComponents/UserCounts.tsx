import { Paper, Text, Title } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import CountUp from 'react-countup';
import classes from './UserCounts.module.css';
import { useState } from 'react';

const userCountData = [
  {
    title: 'Tutors',
    stats: 2175,
  },
  {
    title: 'Students',
    stats: 456133,
  },
];

export function UserCounts() {
  const { ref, inViewport } = useInViewport();
  const [countFinished, setCountFinished] = useState(false);
  const stats = userCountData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text ta='center' className={classes.count}>
        {inViewport && !countFinished && (
          <CountUp
            end={stat.stats}
            duration={4}
            separator=''
            onEnd={() => setCountFinished(true)}
          />
        )}
        {countFinished && stat.stats}
      </Text>
      <Text ta='center' className={classes.title}>
        {stat.title}
      </Text>
    </div>
  ));
  return (
    <Paper withBorder>
      <Title order={1} ta='center' my={'md'}>
        Eduly is home to
      </Title>
      <div ref={ref} className={classes.root}>
        {stats}
      </div>
    </Paper>
  );
}
