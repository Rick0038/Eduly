import {
  ActionIcon,
  Center,
  Container,
  Grid,
  List,
  Loader,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../service';
import { forumService } from '../../service/ForumService';
import { AddQuestion } from '../forum/AddQuestion';
import { QuestionCard } from '../forum/QuestionCard';

export const ForumPage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => forumService.getQuestions(keyword),
    queryKey: ['getQuestions', keyword],
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchQuery);
  };

  return (
    <Container>
      <Title ta={'center'} style={{ padding: '10px' }} order={3}>
        Welcome to Community Forums!
      </Title>

      <Grid>
        <Grid.Col span={authService.isLoggedIn() ? 10 : 12}>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <TextInput
              placeholder='Search questions by keyword'
              rightSection={
                <ActionIcon variant='light' type='submit'>
                  <IconSearch className='w-3 h-3 sm:w-4 sm:h-4' stroke={1.5} />
                </ActionIcon>
              }
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              mb='lg'
            />
          </form>
        </Grid.Col>

        <Grid.Col hidden={!authService.isLoggedIn()} span={2}>
          <AddQuestion onAddQuestion={() => refetch()} />
        </Grid.Col>
      </Grid>

      {isLoading && (
        <Container>
          <Center style={{ height: 'calc(100vh - 120px)' }}>
            <Loader type='bars'></Loader>
          </Center>
        </Container>
      )}

      {isError && (
        <Container>
          <Text ta='center'>An error occurred while fetching questions</Text>
        </Container>
      )}

      <List spacing='sm' size='sm' center>
        {data?.questions.map((question) => (
          <Link key={question.id} to={`/forum/${question.id}`}>
            <QuestionCard key={question.id} question={question} />
          </Link>
        ))}
      </List>
    </Container>
  );
};
