import {
  ActionIcon,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

const data = [
  {
    id: 34,
    title: 'what is that?',
    description: 'blah blah',
    questionBy: 'John Adams',
    timestamp: '2024-06-13 14:23',
  },
];

export const ForumPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container>
      <Title ta={'center'} style={{ padding: '10px' }} order={3}>
        Welcome to Community Forums!
      </Title>

      <Grid>
        <Grid.Col span={10}>
          <form onSubmit={() => alert('submitted!!')}>
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

        <Grid.Col span={2}>
          <Button leftSection={<IconPlus />}>Ask Question</Button>
        </Grid.Col>
      </Grid>

      <List spacing='sm' size='sm' center>
        {data.map((question) => (
          <Card shadow='sm' padding='lg' key={question.id} withBorder>
            <Group style={{ marginBottom: 5 }}>
              <Text size='lg'>{question.title}</Text>
            </Group>
            <Text size='sm'>{question.description}</Text>
            <Text size='xs' c='dimmed'>
              Asked by {question.questionBy} on{' '}
              {new Date(question.timestamp).toLocaleString()}
            </Text>
          </Card>
        ))}
      </List>
    </Container>
  );
};
