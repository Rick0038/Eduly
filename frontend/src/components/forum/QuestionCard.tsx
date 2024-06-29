import { Card, Group, Text } from '@mantine/core';
import { FC } from 'react';
import { Question } from '../../service/ForumService';

export const QuestionCard: FC<{ question: Question }> = ({ question }) => {
  return (
    <Card
      style={{ marginBottom: '20px' }}
      shadow='sm'
      padding='lg'
      key={question.id}
      withBorder
    >
      <Group style={{ marginBottom: 5 }}>
        <Text size='lg'>{question.title}</Text>
      </Group>
      <Text size='sm'>{question.description}</Text>
      <Text size='xs' c='dimmed'>
        Asked by {question.questionBy} on{' '}
        {new Date(question.timestamp).toLocaleString()}
      </Text>
    </Card>
  );
};
