import { Paper, Text, Title } from '@mantine/core';
import classes from './UserCounts.module.css';

const data = [
  {
    title: 'Tutors',
    stats: '2,175',
  },
  {
    title: 'Students',
    stats: '456,133',
  },
];

export function UserCounts() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text ta='center' className={classes.count}>
        {stat.stats}
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
      <div className={classes.root}>{stats}</div>
    </Paper>
  );
}
