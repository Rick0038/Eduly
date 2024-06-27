import { Button, Card, Container, Group, List, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const QuestionDetails = () => {
  const { question, answers } = {
    question: {
      id: 34,
      title: 'what is that?',
      description: 'blah blah',
      questionBy: 'John Adams',
      timestamp: '2024-06-13 14:23',
    },
    answers: [
      {
        id: 34,
        description: 'blah blah',
        answerBy: 'John Adams',
        timestamp: '2024-06-13 14:23:45',
      },
      {
        id: 35,
        description: 'blah blah',
        answerBy: 'John Adams',
        timestamp: '2024-06-13 14:23:45',
      },
    ],
  };

  return (
    <Container>
      <Card shadow='sm' padding='lg' withBorder mb='lg'>
        <Group style={{ marginBottom: 5 }}>
          <Text size='lg'>{question.title}</Text>
          <Text size='xs' c={'gray'}>
            {new Date(question.timestamp).toLocaleString()}
          </Text>
        </Group>
        <Text size='sm' mb='md'>
          {question.description}
        </Text>
        <Text size='xs' color='dimmed'>
          Asked by {question.questionBy}
        </Text>
      </Card>

      <Group justify='space-between' mb={'lg'}>
        <Text size='xl'>Answers</Text>
        <Button leftSection={<IconPlus />}> Add Answer</Button>
      </Group>

      <List spacing='sm' size='sm'>
        {answers.map((answer) => (
          <Card shadow='sm' padding='lg' key={answer.id} withBorder>
            <Group style={{ marginBottom: 5 }}>
              <Text size='sm' c='dimmed'>
                {new Date(answer.timestamp).toLocaleString()}
              </Text>
            </Group>
            <Text size='sm'>{answer.description}</Text>
            <Text size='xs' c='dimmed'>
              Answered by {answer.answerBy}
            </Text>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default QuestionDetails;
