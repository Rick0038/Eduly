import {
  Card,
  Center,
  Container,
  Group,
  List,
  Loader,
  Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { authService } from '../../service';
import { forumService } from '../../service/ForumService';
import { AddAnswer } from './AddAnswer';
import { QuestionCard } from './QuestionCard';

const QuestionDetails = () => {
  const { questionId } = useParams();

  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: () => forumService.getAnswers(parseInt(questionId as string)),
    queryKey: ['getAnswers', questionId],
  });

  if (isError) {
    return (
      <Container>
        <Text ta='center'>An error occurred while fetching answers.</Text>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Center style={{ height: 'calc(100vh - 120px)' }}>
          <Loader type='bars'></Loader>
        </Center>
      </Container>
    );
  }

  return (
    questionId &&
    data && (
      <Container>
        <QuestionCard question={data?.question} />

        <Group justify='space-between' mb={'lg'}>
          <Text size='xl'>Answers</Text>
          {authService.isLoggedIn() && !authService.isAdmin && (
            <AddAnswer
              questionId={parseInt(questionId as string)}
              onAddAnswer={() => refetch()}
            />
          )}
        </Group>

        {data?.answers.length == 0 && (
          <Container>
            <Text ta='center'>No one has yet answered this question.</Text>
          </Container>
        )}

        <List spacing='sm' size='sm'>
          {data.answers.map((answer) => (
            <Card
              style={{ marginBottom: '20px' }}
              shadow='sm'
              padding='lg'
              key={answer.id}
              withBorder
            >
              <Text size='sm'>{answer.description}</Text>
              <Text size='xs' c='dimmed'>
                Answered by {answer.answerBy} on{' '}
                {new Date(answer.timestamp).toLocaleString()}
              </Text>
            </Card>
          ))}
        </List>
      </Container>
    )
  );
};

export default QuestionDetails;
