import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Illustration } from './Illustration';
import classes from './Unauthorized.module.css';

export const Unauthorized = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Unauthorized</Title>
          <Text
            c='dimmed'
            size='lg'
            ta='center'
            className={classes.description}
          >
            You do not have access to the requested page.
          </Text>
          <Group justify='center'>
            <Link to={'/'}>
              <Button size='md'>Take me back to home page</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
};
